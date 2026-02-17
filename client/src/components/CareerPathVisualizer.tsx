import React, { useState, useRef, useEffect } from 'react';

// Node types for the career path graph
interface PathNode {
  id: string;
  title: string;
  level: number;
  category: 'technical' | 'management' | 'specialty';
  description: string;
  skills: string[];
  salary: string;
  timeToAchieve: string;
  prerequisites: string[];
  icon: string;
}

// Edge connecting nodes
interface PathEdge {
  source: string;
  target: string;
  type: 'primary' | 'alternative' | 'advancement';
}

// User progress type
interface UserProgress {
  currentPosition: string;
  completedSkills: string[];
  yearsExperience: number;
}

// Main props for the career path visualizer
interface CareerPathVisualizerProps {
  initialPath?: string;
  showSalary?: boolean;
}

export default function CareerPathVisualizer({ 
  initialPath = 'technical',
  showSalary = true 
}: CareerPathVisualizerProps) {
  const [selectedPath, setSelectedPath] = useState<string>(initialPath);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentPosition: '',
    completedSkills: [],
    yearsExperience: 0
  });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [showIntro, setShowIntro] = useState<boolean>(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Career path data - this would ideally come from an API
  const careerPaths: {
    nodes: PathNode[];
    edges: PathEdge[];
  } = {
    nodes: [
      {
        id: 'junior-consultant',
        title: 'Junior Consultant',
        level: 1,
        category: 'technical',
        description: 'Entry-level position focused on learning consulting methodologies and assisting senior team members with client deliverables.',
        skills: ['Communication', 'Analysis', 'Basic industry knowledge', 'Time management'],
        salary: '$60,000 - $80,000',
        timeToAchieve: '0-2 years',
        prerequisites: ['Bachelor\'s degree', 'Internship experience (recommended)'],
        icon: '🔹'
      },
      {
        id: 'consultant',
        title: 'Consultant',
        level: 2,
        category: 'technical',
        description: 'Mid-level position with responsibility for specific workstreams within client projects and some client interaction.',
        skills: ['Project management', 'Client communication', 'Problem solving', 'Industry expertise'],
        salary: '$80,000 - $110,000',
        timeToAchieve: '2-4 years',
        prerequisites: ['Junior Consultant experience', 'Demonstrated project contributions'],
        icon: '🔷'
      },
      {
        id: 'senior-consultant',
        title: 'Senior Consultant',
        level: 3,
        category: 'technical',
        description: 'Leads significant portions of client projects and is responsible for high-quality deliverables and client relationships.',
        skills: ['Leadership', 'Stakeholder management', 'Deep industry knowledge', 'Strategic thinking'],
        salary: '$110,000 - $150,000',
        timeToAchieve: '4-7 years',
        prerequisites: ['Consultant experience', 'Project leadership', 'Client relationship skills'],
        icon: '💠'
      },
      {
        id: 'project-manager',
        title: 'Project Manager',
        level: 3,
        category: 'management',
        description: 'Manages project delivery, timelines, resources, and budgets to ensure successful outcomes.',
        skills: ['Project planning', 'Team leadership', 'Budget management', 'Risk assessment'],
        salary: '$100,000 - $140,000',
        timeToAchieve: '3-6 years',
        prerequisites: ['Consultant experience', 'Project coordination experience', 'Leadership ability'],
        icon: '📋'
      },
      {
        id: 'engagement-manager',
        title: 'Engagement Manager',
        level: 4,
        category: 'management',
        description: 'Oversees multiple projects or a large engagement, responsible for client satisfaction and delivery excellence.',
        skills: ['Program management', 'Client relationship management', 'Business development', 'Strategic planning'],
        salary: '$140,000 - $180,000',
        timeToAchieve: '6-10 years',
        prerequisites: ['Senior Consultant or Project Manager experience', 'Strong client relationships', 'Team leadership'],
        icon: '📈'
      },
      {
        id: 'specialist-consultant',
        title: 'Specialist Consultant',
        level: 3,
        category: 'specialty',
        description: 'Subject matter expert in a specific domain, technology, or industry vertical who provides specialized insights.',
        skills: ['Deep technical knowledge', 'Specialized expertise', 'Thought leadership', 'Technical advisory'],
        salary: '$120,000 - $160,000',
        timeToAchieve: '4-8 years',
        prerequisites: ['Consultant experience', 'Specialized knowledge or certification', 'Demonstrated expertise'],
        icon: '⚙️'
      },
      {
        id: 'principal-consultant',
        title: 'Principal Consultant',
        level: 5,
        category: 'technical',
        description: 'Senior advisor responsible for complex projects, thought leadership, and significant client relationships.',
        skills: ['Executive advisory', 'Practice development', 'Thought leadership', 'Complex problem solving'],
        salary: '$160,000 - $220,000',
        timeToAchieve: '8-12 years',
        prerequisites: ['Senior Consultant or Specialist experience', 'Industry recognition', 'Business development abilities'],
        icon: '🏆'
      },
      {
        id: 'practice-director',
        title: 'Practice Director',
        level: 5,
        category: 'management',
        description: 'Leads a practice area or industry vertical, responsible for strategy, team development, and market positioning.',
        skills: ['Practice leadership', 'Business development', 'Market strategy', 'Team building'],
        salary: '$180,000 - $250,000',
        timeToAchieve: '10-15 years',
        prerequisites: ['Engagement Manager or Principal Consultant experience', 'Business development track record', 'Team leadership'],
        icon: '👑'
      },
      {
        id: 'partner',
        title: 'Partner / Managing Director',
        level: 6,
        category: 'management',
        description: 'Senior leader responsible for firm strategy, major client relationships, and business growth.',
        skills: ['Executive leadership', 'Business strategy', 'Relationship building', 'Market development'],
        salary: '$250,000+',
        timeToAchieve: '12+ years',
        prerequisites: ['Principal or Director experience', 'Revenue generation', 'Industry leadership', 'Business acumen'],
        icon: '⭐'
      }
    ],
    edges: [
      { source: 'junior-consultant', target: 'consultant', type: 'primary' },
      { source: 'consultant', target: 'senior-consultant', type: 'primary' },
      { source: 'consultant', target: 'project-manager', type: 'alternative' },
      { source: 'consultant', target: 'specialist-consultant', type: 'alternative' },
      { source: 'senior-consultant', target: 'principal-consultant', type: 'primary' },
      { source: 'senior-consultant', target: 'engagement-manager', type: 'alternative' },
      { source: 'project-manager', target: 'engagement-manager', type: 'primary' },
      { source: 'specialist-consultant', target: 'principal-consultant', type: 'primary' },
      { source: 'engagement-manager', target: 'practice-director', type: 'primary' },
      { source: 'principal-consultant', target: 'practice-director', type: 'alternative' },
      { source: 'principal-consultant', target: 'partner', type: 'alternative' },
      { source: 'practice-director', target: 'partner', type: 'primary' }
    ]
  };
  
  // Update container size on window resize
  useEffect(() => {
    const handleResize = () => {
      // Logic to adjust view based on window size
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Filter nodes by path type
  const filteredNodes = careerPaths.nodes.filter(node => {
    if (selectedPath === 'all') return true;
    return node.category === selectedPath;
  });
  
  // Filter edges to only include connections between visible nodes
  const filteredEdges = careerPaths.edges.filter(edge => {
    const sourceVisible = filteredNodes.some(node => node.id === edge.source);
    const targetVisible = filteredNodes.some(node => node.id === edge.target);
    return sourceVisible && targetVisible;
  });
  
  // Get details of selected node
  const selectedNodeDetails = selectedNode 
    ? careerPaths.nodes.find(node => node.id === selectedNode) 
    : null;
  
  // Get coordinates for nodes in graph view
  const getNodeCoordinates = (node: PathNode) => {
    // This is a simple layout algorithm that places nodes based on their level
    // In a real application, you might use a more sophisticated force-directed layout
    const levelSpacing = 180;
    const verticalSpacing = 120;
    
    // Adjust layout based on category and node position in each level
    const nodesAtSameLevel = filteredNodes.filter(n => n.level === node.level);
    const nodeIndexInLevel = nodesAtSameLevel.findIndex(n => n.id === node.id);
    const totalNodesInLevel = nodesAtSameLevel.length;
    
    // Calculate horizontal position
    let x = node.level * levelSpacing;
    
    // Calculate vertical position
    let y;
    if (totalNodesInLevel === 1) {
      y = 300; // Center if only one node
    } else {
      // Distribute nodes vertically
      const levelHeight = (totalNodesInLevel - 1) * verticalSpacing;
      y = 300 - (levelHeight / 2) + (nodeIndexInLevel * verticalSpacing);
    }
    
    return { x, y };
  };
  
  // Handle node selection
  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId);
  };
  
  // Handle category filter change
  const handlePathChange = (path: string) => {
    setSelectedPath(path);
    setSelectedNode(null);
  };
  
  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const handleZoomReset = () => {
    setZoomLevel(1);
  };
  
  // Helper function to get path type label
  const getPathTypeLabel = (pathType: string) => {
    switch(pathType) {
      case 'technical': return 'Technical Path';
      case 'management': return 'Management Path';
      case 'specialty': return 'Specialty Path';
      default: return 'All Paths';
    }
  };
  
  // Determine connection path style based on type
  const getEdgeStyle = (edgeType: string) => {
    switch(edgeType) {
      case 'primary': return 'stroke-indigo-500 stroke-[3px]';
      case 'alternative': return 'stroke-purple-500 stroke-[2px] stroke-dashed';
      case 'advancement': return 'stroke-emerald-500 stroke-[3px]';
      default: return 'stroke-gray-400 stroke-[2px]';
    }
  };

  // Get level label
  const getLevelLabel = (level: number) => {
    switch(level) {
      case 1: return 'Entry Level';
      case 2: return 'Associate Level';
      case 3: return 'Mid-Level';
      case 4: return 'Senior Level';
      case 5: return 'Leadership Level';
      case 6: return 'Executive Level';
      default: return `Level ${level}`;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'technical': return 'from-blue-600 to-indigo-600';
      case 'management': return 'from-purple-600 to-pink-600';
      case 'specialty': return 'from-emerald-600 to-cyan-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };
  
  // Close intro message
  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  // Generate SVG path for an edge
  const generateEdgePath = (edge: PathEdge) => {
    const sourceNode = filteredNodes.find(node => node.id === edge.source);
    const targetNode = filteredNodes.find(node => node.id === edge.target);
    
    if (!sourceNode || !targetNode) return '';
    
    const sourceCoords = getNodeCoordinates(sourceNode);
    const targetCoords = getNodeCoordinates(targetNode);
    
    // Define control points for the curve
    const controlPointX = (sourceCoords.x + targetCoords.x) / 2;
    
    return `M ${sourceCoords.x + 25} ${sourceCoords.y} C ${controlPointX} ${sourceCoords.y}, ${controlPointX} ${targetCoords.y}, ${targetCoords.x - 25} ${targetCoords.y}`;
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl overflow-hidden border border-gray-800">
      {/* Header and controls */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-2 sm:mb-0">Interactive Career Path Visualizer</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1 rounded text-sm ${viewMode === 'graph' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Graph View
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm ${viewMode === 'list' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              List View
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-gray-400 mb-1 block">Career Path Focus</label>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handlePathChange('all')}
                className={`px-3 py-1 text-xs rounded-full ${selectedPath === 'all' 
                  ? 'bg-gray-100 text-gray-900 font-medium' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                All Paths
              </button>
              <button 
                onClick={() => handlePathChange('technical')}
                className={`px-3 py-1 text-xs rounded-full ${selectedPath === 'technical' 
                  ? 'bg-blue-600 text-white font-medium' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Technical Path
              </button>
              <button 
                onClick={() => handlePathChange('management')}
                className={`px-3 py-1 text-xs rounded-full ${selectedPath === 'management' 
                  ? 'bg-purple-600 text-white font-medium' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Management Path
              </button>
              <button 
                onClick={() => handlePathChange('specialty')}
                className={`px-3 py-1 text-xs rounded-full ${selectedPath === 'specialty' 
                  ? 'bg-emerald-600 text-white font-medium' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Specialty Path
              </button>
            </div>
          </div>
          
          {viewMode === 'graph' && (
            <div className="flex items-center space-x-1">
              <button 
                onClick={handleZoomOut}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600 text-gray-300"
                aria-label="Zoom out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
              </button>
              <button 
                onClick={handleZoomReset}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600 text-gray-300 text-xs"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button 
                onClick={handleZoomIn}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600 text-gray-300"
                aria-label="Zoom in"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
          <span className="text-gray-300">Technical Path</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-600 rounded-full mr-1"></div>
          <span className="text-gray-300">Management Path</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-600 rounded-full mr-1"></div>
          <span className="text-gray-300">Specialty Path</span>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-0.5 bg-indigo-500 mr-1"></div>
          <span className="text-gray-300">Primary Progression</span>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-0.5 bg-purple-500 border-dashed border-t-2 border-purple-500 mr-1"></div>
          <span className="text-gray-300">Alternative Path</span>
        </div>
      </div>
      
      {/* Intro message */}
      {showIntro && (
        <div className="relative z-10 mx-4 mt-4 bg-indigo-900/50 rounded-lg p-4 border border-indigo-800/50">
          <button 
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            onClick={handleCloseIntro}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <h3 className="text-lg font-medium mb-2">Explore Career Pathways</h3>
          <p className="text-gray-300 text-sm">
            This interactive tool helps you visualize potential career paths in consulting. 
            Click on any position to view details and requirements. 
            Switch between graph and list views, or filter by path focus.
          </p>
          <div className="mt-3 flex items-center text-sm text-indigo-300">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Click on job roles to see detailed requirements and progression options.</span>
          </div>
        </div>
      )}
      
      {/* Main visualization area */}
      <div 
        ref={containerRef}
        className="relative min-h-[500px] overflow-auto p-4"
      >
        {viewMode === 'graph' ? (
          <div className="min-h-[500px] min-w-[800px]" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
            {/* SVG for edge connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {filteredEdges.map((edge, index) => (
                <path
                  key={`${edge.source}-${edge.target}-${index}`}
                  d={generateEdgePath(edge)}
                  className={`fill-none ${getEdgeStyle(edge.type)}`}
                  markerEnd="url(#arrowhead)"
                />
              ))}
              {/* SVG definitions for markers */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="0"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" className="fill-gray-400" />
                </marker>
              </defs>
            </svg>
            
            {/* Nodes */}
            {filteredNodes.map(node => {
              const coords = getNodeCoordinates(node);
              return (
                <div
                  key={node.id}
                  className={`absolute bg-gray-800 border-2 rounded-lg p-3 w-[200px] cursor-pointer transition-all duration-200 ${
                    selectedNode === node.id
                      ? 'border-white shadow-glow z-20'
                      : 'border-gray-700 hover:border-gray-500 z-10'
                  }`}
                  style={{
                    left: `${coords.x}px`,
                    top: `${coords.y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-gradient-to-br ${getCategoryColor(node.category)}`}>
                      <span className="text-xl">{node.icon}</span>
                    </div>
                    <h3 className="font-medium text-white text-sm leading-tight">{node.title}</h3>
                  </div>
                  <div className="text-xs text-gray-400 flex flex-col">
                    <span className="bg-gray-700/50 px-2 py-0.5 rounded mb-1">{getLevelLabel(node.level)}</span>
                    {showSalary && (
                      <span className="text-gray-300">{node.salary}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredNodes
              .sort((a, b) => a.level - b.level)
              .map(node => (
                <div 
                  key={node.id}
                  className={`bg-gray-800 border rounded-lg p-4 cursor-pointer hover:bg-gray-750 transition-colors ${
                    selectedNode === node.id 
                      ? 'border-indigo-500 ring-1 ring-indigo-500' 
                      : 'border-gray-700'
                  }`}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br ${getCategoryColor(node.category)}`}>
                      <span className="text-xl">{node.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{node.title}</h3>
                      <div className="flex items-center text-xs">
                        <span className="bg-gray-700/70 px-2 py-0.5 rounded text-gray-300">
                          {getLevelLabel(node.level)}
                        </span>
                        {showSalary && (
                          <span className="ml-2 text-gray-400">{node.salary}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{node.description}</p>
                  <div className="text-xs">
                    <div className="flex items-center text-indigo-400 mb-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{node.timeToAchieve}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {node.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {node.skills.length > 3 && (
                        <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                          +{node.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      
      {/* Selected node details */}
      {selectedNodeDetails && (
        <div className="border-t border-gray-700 bg-gray-800/80 backdrop-blur-sm p-4">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br ${getCategoryColor(selectedNodeDetails.category)}`}>
              <span className="text-2xl">{selectedNodeDetails.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{selectedNodeDetails.title}</h3>
              <div className="flex items-center text-sm text-gray-400">
                <span className="mr-3">{getLevelLabel(selectedNodeDetails.level)}</span>
                {showSalary && (
                  <>
                    <span className="mr-3">•</span>
                    <span>{selectedNodeDetails.salary}</span>
                  </>
                )}
                <span className="mx-3">•</span>
                <span>Typical timeframe: {selectedNodeDetails.timeToAchieve}</span>
              </div>
            </div>
            <button 
              className="ml-auto text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
              onClick={() => setSelectedNode(null)}
              aria-label="Close details"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300 mb-4">{selectedNodeDetails.description}</p>
              
              <h4 className="font-medium text-white mb-2">Key Skills</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedNodeDetails.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-2">Prerequisites</h4>
              <ul className="space-y-1 mb-4">
                {selectedNodeDetails.prerequisites.map(prereq => (
                  <li key={prereq} className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-indigo-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">{prereq}</span>
                  </li>
                ))}
              </ul>
              
              <h4 className="font-medium text-white mb-2">Potential Next Steps</h4>
              <div className="space-y-2">
                {careerPaths.edges
                  .filter(edge => edge.source === selectedNodeDetails.id)
                  .map(edge => {
                    const targetNode = careerPaths.nodes.find(node => node.id === edge.target);
                    if (!targetNode) return null;
                    
                    return (
                      <button
                        key={targetNode.id}
                        className={`w-full text-left p-2 rounded border border-gray-700 hover:border-gray-500 transition-colors ${
                          edge.type === 'primary' 
                            ? 'bg-indigo-900/30 hover:bg-indigo-900/50' 
                            : 'bg-gray-700/50 hover:bg-gray-700'
                        }`}
                        onClick={() => setSelectedNode(targetNode.id)}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-gradient-to-br ${getCategoryColor(targetNode.category)}`}>
                            <span className="text-lg">{targetNode.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-white text-sm">{targetNode.title}</h5>
                            <span className="text-xs text-gray-400">
                              {edge.type === 'primary' ? 'Typical progression' : 'Alternative path'}
                            </span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom styling */}
      <style>
        {`
          .shadow-glow {
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
          }
          
          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }
          
          .stroke-dashed {
            stroke-dasharray: 5, 5;
          }
        `}
      </style>
    </div>
  );
}
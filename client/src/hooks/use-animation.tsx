import { useEffect, useRef } from 'react';

interface AnimationObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  animateOnLoad?: boolean;
}

/**
 * A hook for triggering animations when elements enter the viewport
 * @param {string} animationClasses - CSS animation classes to apply
 * @param {AnimationObserverOptions} options - Intersection observer options
 * @returns {React.RefObject<HTMLElement>} - Ref to attach to the element
 */
export function useAnimation(
  animationClasses: string,
  options: AnimationObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    animateOnLoad = true
  } = options;
  
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    // Immediately apply animations if animateOnLoad is true
    if (animateOnLoad) {
      const delay = setTimeout(() => {
        element.classList.add(...animationClasses.split(' '));
      }, 100); // Small delay to ensure DOM is ready
      
      return () => clearTimeout(delay);
    } else {
      // Use Intersection Observer for scroll-triggered animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element.classList.add(...animationClasses.split(' '));
              
              if (once) {
                observer.unobserve(element);
              }
            } else if (!once) {
              element.classList.remove(...animationClasses.split(' '));
            }
          });
        },
        { threshold, rootMargin }
      );
      
      observer.observe(element);
      
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [animationClasses, threshold, rootMargin, once, animateOnLoad]);
  
  return elementRef;
}

/**
 * Creates staggered animation effects for children of a container
 * @param {string} childAnimationClass - CSS animation class to apply to children
 * @param {AnimationObserverOptions} options - Intersection observer options
 * @returns {React.RefObject<HTMLElement>} - Ref to attach to the container
 */
export function useStaggeredAnimation(
  childAnimationClass: string,
  options: AnimationObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    animateOnLoad = true
  } = options;
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;
    
    const children = Array.from(container.children);
    
    if (animateOnLoad) {
      // Apply animations with staggered delay on load
      children.forEach((child, index) => {
        const delay = setTimeout(() => {
          child.classList.add(childAnimationClass);
        }, 100 + (index * 150)); // Base delay + staggered increment
        
        return () => clearTimeout(delay);
      });
    } else {
      // Use Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add(childAnimationClass);
              }, index * 150);
            });
            
            if (once) {
              observer.unobserve(container);
            }
          } else if (!once) {
            children.forEach((child) => {
              child.classList.remove(childAnimationClass);
            });
          }
        },
        { threshold, rootMargin }
      );
      
      observer.observe(container);
      
      return () => {
        if (container) {
          observer.unobserve(container);
        }
      };
    }
  }, [childAnimationClass, threshold, rootMargin, once, animateOnLoad]);
  
  return containerRef;
}
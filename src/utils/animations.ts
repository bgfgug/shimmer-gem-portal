
interface AnimationOptions {
  delay?: number;
  duration?: number;
  ease?: string;
}

export const fadeIn = (options?: AnimationOptions) => {
  return {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        delay: options?.delay || 0,
        duration: options?.duration || 0.5,
        ease: options?.ease || "easeOut"
      }
    }
  };
};

export const slideUp = (options?: AnimationOptions) => {
  return {
    hidden: { y: 30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        delay: options?.delay || 0,
        duration: options?.duration || 0.5,
        ease: options?.ease || "easeOut"
      }
    }
  };
};

export const slideDown = (options?: AnimationOptions) => {
  return {
    hidden: { y: -30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        delay: options?.delay || 0,
        duration: options?.duration || 0.5,
        ease: options?.ease || "easeOut"
      }
    }
  };
};

export const slideLeft = (options?: AnimationOptions) => {
  return {
    hidden: { x: 30, opacity: 0 },
    show: { 
      x: 0, 
      opacity: 1,
      transition: {
        delay: options?.delay || 0,
        duration: options?.duration || 0.5,
        ease: options?.ease || "easeOut"
      }
    }
  };
};

export const slideRight = (options?: AnimationOptions) => {
  return {
    hidden: { x: -30, opacity: 0 },
    show: { 
      x: 0, 
      opacity: 1,
      transition: {
        delay: options?.delay || 0,
        duration: options?.duration || 0.5,
        ease: options?.ease || "easeOut"
      }
    }
  };
};

export const scale = (options?: AnimationOptions) => {
  return {
    hidden: { scale: 0.9, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: options?.delay || 0,
        duration: options?.duration || 0.5,
        ease: options?.ease || "easeOut"
      }
    }
  };
};

export const staggerContainer = (options?: AnimationOptions) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: options?.delay || 0.1,
        delayChildren: options?.duration || 0
      }
    }
  };
};

export const rotateIn = (options?: AnimationOptions) => {
  return {
    hidden: { rotate: -10, opacity: 0 },
    show: { 
      rotate: 0, 
      opacity: 1,
      transition: {
        delay: options?.delay || 0,
        duration: options?.duration || 0.5,
        ease: options?.ease || "easeOut"
      }
    }
  };
};

export const bounceIn = (options?: AnimationOptions) => {
  return {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: [0.8, 1.2, 0.9, 1], 
      opacity: 1,
      transition: {
        delay: options?.delay || 0,
        duration: options?.duration || 0.8,
        ease: options?.ease || "easeOut"
      }
    }
  };
};

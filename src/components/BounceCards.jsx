import { useState, useRef } from "react";
import { motion } from "framer-motion";

const ROTATIONS = [-18, -9, 0, 9, 18];

const BounceCards = ({
    className = "",
    images = [],
    containerWidth = 400,
    containerHeight = 400,
    animationDelay = 0.1,
    animationStagger = 0.08,
    enableHover = true,
    onCardClick = null,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [elevatedIndex, setElevatedIndex] = useState(null);
    const returningIndex = useRef(null);
    // Track cards that have completed their entrance so we don't re-apply the stagger delay on hover-out
    const enteredCards = useRef(new Set());

    const count = images.length;
    const cardW = Math.round(containerWidth * 0.28);
    const cardH = Math.round(cardW * 1.4);
    const spread = containerWidth * 0.55;
    const step = count > 1 ? spread / (count - 1) : 0;

    return (
        <div
            className={`relative ${className}`}
            style={{ width: containerWidth, height: containerHeight }}
        >
            {images.map((src, index) => {
                const rotation = ROTATIONS[index % ROTATIONS.length];
                const offsetX = -spread / 2 + index * step;
                const isHovered = hoveredIndex === index;
                const entranceDelay = animationDelay + index * animationStagger;
                const transitionDelay = enteredCards.current.has(index) ? 0 : entranceDelay;

                return (
                    <motion.div
                        key={index}
                        onHoverStart={() => {
                            if (!enableHover) return;
                            // Cancel any pending z-index reset for this card
                            if (returningIndex.current === index) returningIndex.current = null;
                            setHoveredIndex(index);
                            setElevatedIndex(index);
                        }}
                        onHoverEnd={() => {
                            // Start animation back immediately
                            setHoveredIndex(null);
                            // Mark as returning — z-index clears when animation settles
                            returningIndex.current = index;
                        }}
                        onAnimationComplete={() => {
                            // Mark entrance as done so future transitions skip the stagger delay
                            enteredCards.current.add(index);
                            if (returningIndex.current === index) {
                                returningIndex.current = null;
                                setElevatedIndex(null);
                            }
                        }}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: cardW,
                            height: cardH,
                            marginLeft: -cardW / 2,
                            marginTop: -cardH / 2,
                            borderRadius: 12,
                            overflow: "hidden",
                            border: "3px solid white",
                            boxShadow: isHovered
                                ? "0 20px 40px rgba(0,0,0,0.35)"
                                : "0 6px 18px rgba(0,0,0,0.22)",
                            zIndex: elevatedIndex === index ? 50 : index,
                            cursor: onCardClick || enableHover ? "pointer" : "default",
                        }}
                        onClick={() => onCardClick && onCardClick(index)}
                        initial={{ opacity: 0, y: 60, scale: 0.7, rotate: rotation }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? 0 : rotation,
                            x: offsetX,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 22,
                            // Only stagger on the initial entrance — hover in/out is always instant
                            delay: transitionDelay,
                        }}
                    >
                        <img
                            src={src}
                            alt={`card-${index}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default BounceCards;

import { AnimatePresence, motion } from "framer-motion";
export default function Usefade({ children, isActive, duration = 0.8 }) {
    return (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, delay: 0.6 }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{ opacity: 0, transition: { delay: -0.6 } }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

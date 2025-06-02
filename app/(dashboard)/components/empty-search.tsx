import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedContainer } from "@/components/ui/animated-container"

export const EmptySearch = () => {
    return (
        <AnimatedContainer animation="fade">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex flex-col items-center justify-center"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Image
                        src="/empty-search.svg"
                        alt="Empty"
                        width={340}
                        height={340}
                    />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-semibold mt-6"
                >
                    No results found
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-muted-foreground text-sm mt-2"
                >
                    Try searching for something else
                </motion.p>
            </motion.div>
        </AnimatedContainer>
    );
};
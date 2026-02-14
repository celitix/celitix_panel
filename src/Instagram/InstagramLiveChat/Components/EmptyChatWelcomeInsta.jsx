import React from 'react'
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";

//  ASSETS
import liveChatAnimation from "@/assets/animation/InstaChatscreen";

const EmptyChatWelcomeInsta = () => {
    return (
        <>
            <AnimatePresence mode="wait" >
                <motion.div
                    key="empty-chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex flex-col items-center justify-center w-full h-full bg-[#F8FAFC] overflow-hidden"
                >
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                                x: [0, 50, 0]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#f9ce34]/10 via-[#ee2a7b]/10 to-[#6228d7]/10 rounded-full filter blur-[100px] -top-48 -left-24"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, -45, 0],
                                x: [0, -30, 0]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[400px] h-[400px] bg-gradient-to-br from-[#6228d7]/10 via-[#ee2a7b]/10 to-[#f9ce34]/10 rounded-full filter blur-[80px] -bottom-32 -right-16"
                        />
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="relative z-10 px-8 py-12 bg-white/40 backdrop-blur-2xl rounded-[32px] border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] text-center w-full max-w-md mx-auto"
                    >
                        <div className="relative w-56 h-56 mx-auto mb-6">
                            <div className="absolute inset-0 bg-[#ee2a7b]/5 rounded-full blur-2xl" />
                            <Lottie
                                animationData={liveChatAnimation}
                                loop
                                autoplay
                                style={{ width: "100%", height: "100%", position: 'relative', zIndex: 1 }}
                            />
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl md:text-3xl font-semibold mb-2 bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] bg-clip-text text-transparent"
                        >
                            Welcome to LiveChat!
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-[15px] leading-relaxed text-slate-500 font-medium px-4"
                        >
                            Manage your conversations and engage with your followers in real-time.

                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8 flex justify-center gap-2"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                            <div className="w-8 h-1.5 rounded-full bg-gradient-to-r from-[#ee2a7b] to-[#6228d7]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>


        </>
    )
}

export default EmptyChatWelcomeInsta
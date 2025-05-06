"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Download, Tag, Clock, Users, Gamepad2 } from "lucide-react";
import { useParams } from "next/navigation";
import { getGameById, Game } from "@/lib/games";
import { motion } from "framer-motion";

export default function GameDetails() {
  const params = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const gameId = parseInt(params.id as string);
    const foundGame = getGameById(gameId);
    setGame(foundGame || null);
  }, [params.id]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (!game) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#F7F9FC] flex items-center justify-center"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-[#FFD42A] neo-shadow mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">🎮</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-black font-[family-name:var(--font-fredoka)]">Game not found</h3>
          <Link 
            href="/game-lists"
            className="inline-block bg-[#FF5252] text-white px-6 py-3 neo-button hover:shadow-[6px_6px_0px_#000] shadow-[4px_4px_0px_#000] mt-4"
          >
            Back to Games
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  const handleDownloadClick = () => {
    setShowDownloadPopup(true);
  };

  const closePopup = () => {
    setShowDownloadPopup(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 border-b-4 border-black bg-white py-4 px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FF5252] border-3 border-black flex items-center justify-center font-bold text-white transform -rotate-3 shadow-[4px_4px_0px_#000]">
                IG
              </div>
              <h1 className="text-2xl font-black transform rotate-1 uppercase tracking-tight font-[family-name:var(--font-archivo)] text-black">Ignitor</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("description")}
              className="text-black hover:text-[#FF5252] transition-colors font-bold"
            >
              Description
            </button>
            <button
              onClick={() => scrollToSection("developer")}
              className="text-black hover:text-[#FF5252] transition-colors font-bold"
            >
              Developer
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-black hover:text-[#FF5252] transition-colors font-bold"
            >
              Features
            </button>
            <Link
              href="/game-lists"
              className="bg-black text-white px-4 py-2 font-bold border-2 border-black hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_#FF5252] shadow-[4px_4px_0px_#FF5252] transition-all"
            >
              Back to Games
            </Link>
            <button
              onClick={handleDownloadClick}
              className="bg-[#FF5252] text-white px-4 py-2 font-bold border-2 border-black hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_#000] shadow-[4px_4px_0px_#000] transition-all"
            >
              Download Game
            </button>
          </nav>
          <div className="md:hidden">
            <Link
              href="/game-lists"
              className="bg-black text-white px-4 py-2 font-bold border-2 border-black hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_#FF5252] shadow-[4px_4px_0px_#FF5252] transition-all"
            >
              Back to Games
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* Game Title and Basic Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-black mb-4 text-black"
          >
            {game.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#FF5252]" />
              <span className="font-bold text-black">{game.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-[#FFD42A]" />
              <span className="font-bold text-black">{game.totalDownloads || '0'} Downloads</span>
            </div>
            {game.playTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2FB8AC]" />
                <span className="font-bold text-black">{game.playTime}</span>
              </div>
            )}
            {game.players && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FF5252]" />
                <span className="font-bold text-black">{game.players}</span>
              </div>
            )}
            {game.genre && (
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-[#845EC2]" />
                <span className="font-bold text-black">{game.genre}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="bg-[#F7F9FC] px-3 py-1 border-2 border-black font-medium text-sm text-black">
                {game.size}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Left Column - Screenshots */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-2"
          >
            <div className="neo-shadow bg-white p-4 mb-4">
              <div className="aspect-video relative mb-4 bg-[#F7F9FC]">
                {imageLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 border-4 border-[#FF5252] border-t-transparent rounded-full animate-spin"></div>
                  </motion.div>
                )}
                <NextImage
                  src={game.screenshots?.[selectedImage] || game.thumbnail}
                  alt={`${game.title} screenshot`}
                  fill
                  className="object-cover"
                  onLoadingComplete={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              </div>
              {game.screenshots && game.screenshots.length > 0 && (
                <motion.div 
                  variants={staggerContainer}
                  className="grid grid-cols-4 gap-4"
                >
                  {game.screenshots.map((screenshot, index) => (
                    <motion.button
                      key={index}
                      variants={fadeInUp}
                      onClick={() => {
                        setImageLoading(true);
                        setSelectedImage(index);
                      }}
                      className={`aspect-video relative neo-shadow bg-[#F7F9FC] ${
                        selectedImage === index ? "ring-4 ring-[#FF5252]" : ""
                      }`}
                    >
                      <NextImage
                        src={screenshot}
                        alt={`${game.title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Game Info */}
          <motion.div 
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Description */}
            <motion.div 
              id="description"
              variants={fadeInUp}
              className="neo-shadow bg-white p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-black">Description</h2>
              <p className="text-black">{game.description}</p>
            </motion.div>

            {/* Developer Info */}
            {game.developer && (
              <motion.div 
                id="developer"
                variants={fadeInUp}
                className="neo-shadow bg-white p-6"
              >
                <h2 className="text-xl font-bold mb-4 text-black">Developer Info</h2>
                <div className="space-y-2">
                  {game.developer && <p className="text-black"><span className="font-bold">Developer:</span> {game.developer}</p>}
                  {game.publisher && <p className="text-black"><span className="font-bold">Publisher:</span> {game.publisher}</p>}
                  {game.releaseDate && <p className="text-black"><span className="font-bold">Release Date:</span> {game.releaseDate}</p>}
                </div>
              </motion.div>
            )}

            {/* Features */}
            {game.features && game.features.length > 0 && (
              <motion.div 
                id="features"
                variants={fadeInUp}
                className="neo-shadow bg-white p-6"
              >
                <h2 className="text-xl font-bold mb-4 text-black">Key Features</h2>
                <ul className="space-y-2">
                  {game.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#FF5252]">•</span>
                      <span className="text-black">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </main>

      <footer className="bg-black text-white py-10 px-6 md:px-10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FF5252] border-2 border-white flex items-center justify-center font-bold text-white transform -rotate-3">
                IG
              </div>
              <h3 className="text-xl font-black transform rotate-1 font-[family-name:var(--font-archivo)]">Ignitor</h3>
            </div>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Ignitor Game Launcher Team</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-8"
          >
            <a href="#" className="hover:text-[#FF5252]">Privacy</a>
            <a href="#" className="hover:text-[#FF5252]">Terms</a>
            <a href="#" className="hover:text-[#FF5252]">Contact</a>
          </motion.div>
        </div>
      </footer>

      {/* Download Confirmation Popup */}
      {showDownloadPopup && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={closePopup}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="neo-shadow bg-white p-6 max-w-lg w-full relative border-4 border-black transform rotate-[-1deg] animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 transform -rotate-1">
              <h3 className="text-2xl font-black font-[family-name:var(--font-archivo)] mb-2 text-black">Download {game.title}</h3>
              <div className="w-full h-1 bg-black"></div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#2FB8AC] border-3 border-black flex-shrink-0 flex items-center justify-center shadow-[4px_4px_0px_#000]">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold mb-2 text-black">Ready to download {game.title}?</p>
                  <p className="text-black font-medium">File size: {game.size}</p>
                  <p className="text-black font-medium">Category: {game.category}</p>
                </div>
              </div>
              
              <div className="bg-[#F7F9FC] p-4 border-2 border-black mb-4">
                <p className="text-sm font-bold mb-2 text-black">Game Description:</p>
                <p className="text-sm text-black font-medium">{game.description}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  window.open(game.downloadUrl, "_blank");
                  closePopup();
                }}
                className="flex-1 bg-[#FF5252] text-white py-3 neo-button hover:shadow-[8px_8px_0px_#000] shadow-[6px_6px_0px_#000] flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Now
              </button>
              <button 
                onClick={closePopup}
                className="flex-1 bg-white py-3 neo-button hover:shadow-[8px_8px_0px_#000] shadow-[6px_6px_0px_#000] border-2 border-black text-black"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 
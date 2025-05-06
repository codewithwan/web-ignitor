"use client";

import { Download, Search, Tag, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { games, categories, Game, searchGames, getGamesByCategory } from "@/lib/games";
import { motion, AnimatePresence } from "framer-motion";

export default function GameList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = (game: Game) => {
    setSelectedGame(game);
    setShowDownloadPopup(true);
  };

  const closePopup = () => {
    setShowDownloadPopup(false);
  };

  const downloadGame = () => {
    if (selectedGame) {
      window.open(selectedGame.downloadUrl, "_blank");
      closePopup();
    }
  };

  const filteredGames = searchGames(searchTerm).filter(game => 
    selectedCategory === "All" || game.category === selectedCategory
  );

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

  return (
    <div className="min-h-screen bg-[#F7F9FC] overflow-x-hidden relative flex flex-col">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[10%] left-[10%] w-16 h-16 bg-[#FF5252] border-3 border-black rotate-12 shadow-[4px_4px_0px_#000]"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[20%] right-[15%] w-12 h-12 bg-[#2FB8AC] border-3 border-black -rotate-6 shadow-[4px_4px_0px_#000]"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[30%] left-[20%] w-20 h-20 bg-[#FFD42A] border-3 border-black rotate-12 shadow-[4px_4px_0px_#000]"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-[15%] right-[10%] w-14 h-14 bg-[#FF7B7B] border-3 border-black -rotate-12 shadow-[4px_4px_0px_#000]"
        ></motion.div>
      </div>

      {/* Download Confirmation Popup */}
      {showDownloadPopup && selectedGame && (
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
              <h3 className="text-2xl font-black font-[family-name:var(--font-archivo)] mb-2 text-black">Download {selectedGame.title}</h3>
              <div className="w-full h-1 bg-black"></div>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#2FB8AC] border-3 border-black flex-shrink-0 flex items-center justify-center shadow-[4px_4px_0px_#000]">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold mb-2 text-black">Ready to download {selectedGame.title}?</p>
                  <p className="text-[#1F1F1F] font-medium">File size: {selectedGame.size}</p>
                  <p className="text-[#1F1F1F] font-medium">Category: {selectedGame.category}</p>
                </div>
              </div>

              <div className="bg-[#F7F9FC] p-4 border-2 border-black mb-4">
                <p className="text-sm font-bold mb-2 text-black">Game Description:</p>
                <p className="text-sm text-[#1F1F1F] font-medium">{selectedGame.description}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={downloadGame}
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
          <Link
            href="/"
            className="bg-black text-white px-4 py-2 font-bold border-2 border-black hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_#FF5252] shadow-[4px_4px_0px_#FF5252] transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.header>

      <main className="relative z-10 py-12 px-6 md:px-10 flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-black tracking-tight mb-4 font-[family-name:var(--font-archivo)] text-black"
            >
              Game <span className="text-[#FF5252] transform inline-block rotate-1">Library</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-[#1F1F1F] font-medium mb-8 max-w-2xl"
            >
              Browse our collection of games and download them to play using the Ignitor Launcher.
            </motion.p>

            {/* Search and Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-4 mb-8"
            >
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full border-3 border-black py-3 pl-12 pr-4 neo-shadow focus:outline-none focus:shadow-[6px_6px_0px_#000] font-medium text-black placeholder:text-gray-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex border-3 border-black neo-shadow bg-white cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="bg-black border-r-3 border-black flex items-center px-4">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <div className="py-3 px-6 pr-10 font-medium text-black flex items-center justify-between min-w-[200px]">
                    <span>{selectedCategory}</span>
                    <div className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border-3 border-black neo-shadow z-50"
                    >
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-6 py-3 text-left font-medium text-black hover:bg-[#F7F9FC] transition-colors ${
                            selectedCategory === category ? 'bg-[#F7F9FC] font-bold' : ''
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Game Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGames.length > 0 ? (
              filteredGames.map(game => (
                <motion.div 
                  key={game.id}
                  variants={fadeInUp}
                  className="neo-shadow bg-white border-3 border-black overflow-hidden hover:translate-y-[-5px] transition-all"
                >
                  <Link href={`/game-lists/${game.id}`} className="block">
                    <div className="h-48 relative overflow-hidden border-b-3 border-black">
                      <div className="absolute inset-0 flex items-center justify-center bg-[#F7F9FC]">
                        <NextImage
                          src={game.thumbnail}
                          alt={game.title}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="absolute top-0 right-0 bg-[#FF5252] px-3 py-1 border-l-3 border-b-3 border-black text-white font-bold font-[family-name:var(--font-fredoka)]">
                        {game.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 text-black font-[family-name:var(--font-fredoka)]">{game.title}</h3>
                      <p className="text-[#1F1F1F] mb-4 text-sm line-clamp-2 font-medium">{game.description}</p>

                      <div className="flex justify-between items-center">
                        <span className="bg-[#F7F9FC] px-3 py-1 border-2 border-black font-medium text-sm text-black">
                          {game.size}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDownload(game);
                          }}
                          className="bg-[#FF5252] text-white px-4 py-2 neo-button hover:shadow-[6px_6px_0px_#000] shadow-[4px_4px_0px_#000] flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                variants={fadeInUp}
                className="col-span-full text-center py-12"
              >
                <div className="w-20 h-20 bg-[#FFD42A] neo-shadow mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🎮</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black font-[family-name:var(--font-fredoka)]">No games found</h3>
                <p className="text-[#1F1F1F] font-medium">Try adjusting your search or filter criteria.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <footer className="bg-black text-white py-10 px-6 md:px-10 relative z-10 mt-auto">
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
    </div>
  );
} 
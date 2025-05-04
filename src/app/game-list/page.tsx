"use client";

import { Download, Search, Tag, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

interface Game {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  size: string;
  category: string;
  downloadUrl: string;
}

const games: Game[] = [
  {
    id: 1,
    title: "ASEAN Greetings",
    description: "An educational game that introduces you to basic greetings and phrases from ASEAN countries.",
    thumbnail: "/games/asean-greetings.jpg",
    size: "20 MB",
    category: "Educational",
    downloadUrl: "/downloads/asean-greetings.zip"
  },
  {
    id: 2,
    title: "SOCCPONG",
    description: "A simple and fun soccer game.",
    thumbnail: "/games/soccpong.png",
    size: "40 MB ",
    category: "Sports",
    downloadUrl: "http://console.codewithwan.my.id/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2dhbWVzL1NvY2NQb25nLnppcD9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPU9UMk5PTVUwWFUzNU5XRjVKWk4xJTJGMjAyNTA1MDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTA0VDEyNTQyNlomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSlBWREpPVDAxVk1GaFZNelZPVjBZMVNscE9NU0lzSW1WNGNDSTZNVGMwTmpNNU1USTBNU3dpY0dGeVpXNTBJam9pWVdSdGFXNGlmUS5TUVVnaVRMLUUtbEZtSTBTaW5tYlNobEhfMnVHSVF1TlczNkhmZUJzbkhmdEdPV3lYRm9vdW43UV9GMDB6UlY0azhnWWo3Mkl4Q3ZEQk9QMlVPcXNYZyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTM5ZjQ4OGNhM2E3MTRjOGM1NTc4ZDRhYWQyNzIyNjFkNjM0N2FlY2M3YjEwMDg3YWJjMTk3YjEzZGE0NWJlNmY"
  },
  {
    id: 3,
    title: "Pick & Feed",
    description: "An educational game that teaches children to distinguish between healthy real food and unhealthy junk food through fun sorting activities.",
    thumbnail: "/games/pickandfeed.png",
    size: "150 MB",
    category: "Strategy",
    downloadUrl: "http://console.codewithwan.my.id/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2dhbWVzL1BpY2slMjAlMjYlMjBGZWVkLnppcD9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPU9UMk5PTVUwWFUzNU5XRjVKWk4xJTJGMjAyNTA1MDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTA0VDE3MjkzOFomWC1BbXotRXhwaXJlcz00MzE5OSZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSlBWREpPVDAxVk1GaFZNelZPVjBZMVNscE9NU0lzSW1WNGNDSTZNVGMwTmpNNU1USTBNU3dpY0dGeVpXNTBJam9pWVdSdGFXNGlmUS5TUVVnaVRMLUUtbEZtSTBTaW5tYlNobEhfMnVHSVF1TlczNkhmZUJzbkhmdEdPV3lYRm9vdW43UV9GMDB6UlY0azhnWWo3Mkl4Q3ZEQk9QMlVPcXNYZyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTNiZmU0MmY5NWZlZjE2MWEyYTA4Y2QxNjU0M2M4MGE1NmI2Y2I0OGRjZTYwOGRiYzM2NjU1NTVlMTVhNjkwOTY"
  }
];

const categories = ["All", "Racing", "RPG", "Strategy", "Survival", "Educational", "Sports"];

export default function GameList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleDownload = (game: Game) => {
    setSelectedGame(game);
    setShowDownloadPopup(true);
  };

  const closePopup = () => {
    setShowDownloadPopup(false);
  };

  const downloadGame = () => {
    if (selectedGame) {
      // In a real app, you would implement actual download functionality
      window.open(selectedGame.downloadUrl, "_blank");
      closePopup();
    }
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] overflow-x-hidden relative flex flex-col">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-16 h-16 bg-[#FF5252] border-3 border-black rotate-12 shadow-[4px_4px_0px_#000]"></div>
        <div className="absolute top-[20%] right-[15%] w-12 h-12 bg-[#2FB8AC] border-3 border-black -rotate-6 shadow-[4px_4px_0px_#000]"></div>
        <div className="absolute bottom-[30%] left-[20%] w-20 h-20 bg-[#FFD42A] border-3 border-black rotate-12 shadow-[4px_4px_0px_#000]"></div>
        <div className="absolute bottom-[15%] right-[10%] w-14 h-14 bg-[#FF7B7B] border-3 border-black -rotate-12 shadow-[4px_4px_0px_#000]"></div>
      </div>

      {/* Download Confirmation Popup */}
      {showDownloadPopup && selectedGame && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={closePopup}>
          <div className="neo-shadow bg-white p-6 max-w-lg w-full relative border-4 border-black transform rotate-[-1deg] animate-fadeIn" onClick={(e) => e.stopPropagation()}>
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
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 border-b-4 border-black bg-white py-4 px-6 md:px-10">
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
      </header>

      <main className="relative z-10 py-12 px-6 md:px-10 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 font-[family-name:var(--font-archivo)] text-black">
              Game <span className="text-[#FF5252] transform inline-block rotate-1">Library</span>
            </h1>
            <p className="text-lg text-[#1F1F1F] font-medium mb-8 max-w-2xl">
              Browse our collection of games and download them to play using the Ignitor Launcher.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
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

              <div className="flex border-3 border-black neo-shadow">
                <div className="bg-black border-r-3 border-black flex items-center px-4">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <select
                  className="py-3 px-4 focus:outline-none bg-white font-medium text-black"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map(game => (
                <div key={game.id} className="neo-shadow bg-white border-3 border-black overflow-hidden hover:translate-y-[-5px] transition-all">
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
                        onClick={() => handleDownload(game)}
                        className="bg-[#FF5252] text-white px-4 py-2 neo-button hover:shadow-[6px_6px_0px_#000] shadow-[4px_4px_0px_#000] flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-20 h-20 bg-[#FFD42A] neo-shadow mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🎮</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black font-[family-name:var(--font-fredoka)]">No games found</h3>
                <p className="text-[#1F1F1F] font-medium">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-10 px-6 md:px-10 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FF5252] border-2 border-white flex items-center justify-center font-bold text-white transform -rotate-3">
                IG
              </div>
              <h3 className="text-xl font-black transform rotate-1 font-[family-name:var(--font-archivo)]">Ignitor</h3>
            </div>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Ignitor Game Launcher Team</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#FF5252]">Privacy</a>
            <a href="#" className="hover:text-[#FF5252]">Terms</a>
            <a href="#" className="hover:text-[#FF5252]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 
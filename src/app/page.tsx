"use client";

import { BarChart3, Gamepad2, Rocket, Camera, Download, Check } from "lucide-react";
import { useState } from "react";
import NextImage from "next/image";

export default function Home() {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  const handleDownloadClick = () => {
    setShowDownloadPopup(true);
  };

  const closePopup = () => {
    setShowDownloadPopup(false);
  };

  const downloadLauncher = () => {
    // Actual download logic would go here
    // This is just a placeholder - in a real app, you would trigger the download
    window.open("https://github.com/codewithwan/ignitor-electron/releases", "_blank");
    closePopup();
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] overflow-x-hidden relative">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-16 h-16 bg-[#FF5252] neo-shadow rotate-12"></div>
        <div className="absolute top-[20%] right-[15%] w-12 h-12 bg-[#2FB8AC] neo-shadow -rotate-6"></div>
        <div className="absolute bottom-[30%] left-[20%] w-20 h-20 bg-[#FFD42A] neo-shadow rotate-12"></div>
        <div className="absolute bottom-[15%] right-[10%] w-14 h-14 bg-[#FF7B7B] neo-shadow -rotate-12"></div>
      </div>

      {/* Download Confirmation Popup */}
      {showDownloadPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={closePopup}>
          <div className="neo-shadow bg-white p-6 max-w-lg w-full relative border-4 border-black transform rotate-[-1deg] animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 transform -rotate-1">
              <h3 className="text-2xl font-black font-[family-name:var(--font-archivo)] mb-2 text-black">Download Ignitor Launcher</h3>
              <div className="w-full h-1 bg-black"></div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#2FB8AC] border-3 border-black flex-shrink-0 flex items-center justify-center shadow-[4px_4px_0px_#000]">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold mb-2 text-black">Ready to ignite your gaming experience?</p>
                  <p className="text-[#1F1F1F]">You&apos;re about to download Ignitor Launcher v1.2.0 for Windows. The download will begin immediately after confirmation.</p>
                </div>
              </div>
              
              <div className="bg-[#F7F9FC] p-4 border-2 border-black mb-4">
                <p className="text-sm font-medium mb-2 text-black">System Requirements:</p>
                <ul className="text-sm space-y-1 text-[#1F1F1F]">
                  <li>• Windows 10 or later</li>
                  <li>• 4GB RAM minimum</li>
                  <li>• 500MB available storage</li>
                  <li>• Internet connection for updates</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={downloadLauncher}
                className="flex-1 bg-[#FF5252] text-white py-3 neo-button hover:shadow-[8px_8px_0px_#000] shadow-[6px_6px_0px_#000] flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Confirm Download
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
            <div className="w-12 h-12 bg-[#FF5252] border-3 border-black flex items-center justify-center font-bold text-white transform -rotate-3 shadow-[4px_4px_0px_#000]">
              IG
            </div>
            <h1 className="text-2xl font-black transform rotate-1 uppercase tracking-tight font-[family-name:var(--font-archivo)] text-black">Ignitor</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li><a href="#features" className="font-bold hover:underline text-black">Features</a></li>
              <li><a href="#team" className="font-bold hover:underline text-black">Team</a></li>
              <li><a href="#gallery" className="font-bold hover:underline text-black">Gallery</a></li>
              <li>
                <a
                  href="#download"
                  className="bg-black text-white px-4 py-2 font-bold border-2 border-black hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_#FF5252] shadow-[4px_4px_0px_#FF5252] transition-all"
                >
                  Download
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-10 relative z-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-black text-white inline-block px-3 py-1 transform -rotate-2 font-bold mb-4">
                NEW RELEASE
              </div>
              <h1 className="heading-lg mb-6">
                Ignitor <br />
                <span className="text-[#FF5252] transform inline-block rotate-1">Game Launcher</span>
              </h1>
              <p className="text-body mb-8 max-w-lg">
                A modern, stylish game launcher designed with Neo Brutalism aesthetics. Organize, play, and track your gaming sessions with style.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleDownloadClick} 
                  className="bg-[#FF5252] text-white px-8 py-4 neo-button hover:shadow-[10px_10px_0px_#000] shadow-[8px_8px_0px_#000] text-lg"
                >
                  Download Now
                </button>
                <a href="https://github.com/codewithwan/ignitor-electron" target="_blank" rel="noopener noreferrer" className="bg-white px-8 py-4 neo-button hover:shadow-[10px_10px_0px_#000] shadow-[8px_8px_0px_#000] text-lg text-black inline-block">
                  View on GitHub
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-[90%] aspect-[16/9] neo-shadow bg-white p-4 transform rotate-1">
                <div className="absolute -top-5 -right-5 w-12 h-12 bg-[#FFD42A] neo-shadow transform rotate-12 flex items-center justify-center font-bold">
                  🎮
                </div>
                <div className="w-full h-full bg-[#F7F9FC] flex items-center justify-center overflow-hidden">
                  <NextImage
                    src="/home.png"
                    alt="Ignitor Game Launcher Screenshot"
                    className="object-cover"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 md:px-10 bg-white border-y-4 border-black relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading-md mb-12 shadow-[6px_6px_0px_#2FB8AC]">
              Amazing Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="neo-shadow p-6 bg-[#F7F9FC] skew-card hover:translate-y-[-8px] transition-all">
                <div className="w-16 h-16 bg-[#FF5252] border-3 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_#000]">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-fredoka)] text-black">Game Library</h3>
                <p className="text-[#1F1F1F] font-medium">Organize and access all your games in one place with our intuitive library system.</p>
              </div>

              {/* Feature 2 */}
              <div className="neo-shadow p-6 bg-[#F7F9FC] skew-card-reverse hover:translate-y-[-8px] transition-all">
                <div className="w-16 h-16 bg-[#2FB8AC] border-3 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_#000]">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-fredoka)] text-black">Gameplay Stats</h3>
                <p className="text-[#1F1F1F] font-medium">Track your gaming habits, playtime, and achievements with detailed statistics.</p>
              </div>

              {/* Feature 3 */}
              <div className="neo-shadow p-6 bg-[#F7F9FC] skew-card hover:translate-y-[-8px] transition-all">
                <div className="w-16 h-16 bg-[#FFD42A] border-3 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_#000]">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-fredoka)] text-black">Fast Launch</h3>
                <p className="text-[#1F1F1F] font-medium">Start your games instantly with our optimized launching system.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 px-6 md:px-10 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading-md mb-12 shadow-[6px_6px_0px_#FF5252]">
              Developer Team
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Team Member 1 */}
              <div className="neo-shadow bg-white overflow-hidden flex hover:translate-y-[-5px] hover:translate-x-[-5px] hover:shadow-[12px_12px_0px_#000] transition-all">
                <div className="w-28 bg-[#FF5252] flex items-center justify-center border-r-4 border-black">
                  <div className="text-white text-4xl font-black font-[family-name:var(--font-archivo)]">MR</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold transform -rotate-1 inline-block font-[family-name:var(--font-fredoka)] text-black">Muhammad Ridwan</h3>
                  <p className="text-sm mb-4 text-[#1F1F1F] font-medium">Berfokus pada pengembangan game dan launcher game walau aslinya ga fokus fokus amat</p>
                  <div className="bg-[#FFD42A] p-3 border-3 border-black transform rotate-1 text-sm font-bold shadow-[4px_4px_0px_#000] text-black">
                    &ldquo;when yh jago..&rdquo;
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="neo-shadow bg-white overflow-hidden flex hover:translate-y-[-5px] hover:translate-x-[-5px] hover:shadow-[12px_12px_0px_#000] transition-all">
                <div className="w-28 bg-[#2FB8AC] flex items-center justify-center border-r-4 border-black">
                  <div className="text-white text-4xl font-black font-[family-name:var(--font-archivo)]">MS</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold transform -rotate-1 inline-block font-[family-name:var(--font-fredoka)] text-black">M. Syahrul Romadhon</h3>
                  <p className="text-sm mb-4 text-[#1F1F1F] font-medium">Penikmat Sepak Bola 🤤</p>
                  <div className="bg-[#FFD42A] p-3 border-3 border-black transform rotate-1 text-sm font-bold shadow-[4px_4px_0px_#000] text-black">
                    &ldquo;Jika mencari jarum dalam jerami bakar jeraminya&rdquo;
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="neo-shadow bg-white overflow-hidden flex hover:translate-y-[-5px] hover:translate-x-[-5px] hover:shadow-[12px_12px_0px_#000] transition-all">
                <div className="w-28 bg-[#3B82F6] flex items-center justify-center border-r-4 border-black">
                  <div className="text-white text-4xl font-black font-[family-name:var(--font-archivo)]">DD</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold transform -rotate-1 inline-block font-[family-name:var(--font-fredoka)] text-black">Dea Derika Winahyu</h3>
                  <p className="text-sm mb-4 text-[#1F1F1F] font-medium">Bertanggung jawab atas desain visual dan pengalaman pengguna yang intuitif.</p>
                  <div className="bg-[#FFD42A] p-3 border-3 border-black transform rotate-1 text-sm font-bold shadow-[4px_4px_0px_#000] text-black">
                    &ldquo;Punya 627 font, tapi selalu pakai Poppins dan Montserrat aja.&rdquo;
                  </div>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="neo-shadow bg-white overflow-hidden flex hover:translate-y-[-5px] hover:translate-x-[-5px] hover:shadow-[12px_12px_0px_#000] transition-all">
                <div className="w-28 bg-[#845EC2] flex items-center justify-center border-r-4 border-black">
                  <div className="text-white text-4xl font-black font-[family-name:var(--font-archivo)]">KY</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold transform -rotate-1 inline-block font-[family-name:var(--font-fredoka)] text-black">Kartika Yuliana</h3>
                  <p className="text-sm mb-4 text-[#1F1F1F] font-medium">Fokus pada pengembangan mekanik permainan dan integrasi fitur interaktif.</p>
                  <div className="bg-[#FFD42A] p-3 border-3 border-black transform rotate-1 text-sm font-bold shadow-[4px_4px_0px_#000] text-black">
                    &ldquo;Katanya testing game, tapi setengah hari cuma main Valorant.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 px-6 md:px-10 bg-white border-y-4 border-black relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-[#845EC2] border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h2 className="heading-md shadow-[6px_6px_0px_#845EC2]">
                Gallery
              </h2>
            </div>
            
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {/* Large Screenshot 1 */}
              <div className="col-span-12 md:col-span-8 aspect-video neo-shadow bg-white p-3 transform rotate-1 hover:rotate-0 transition-all hover:z-10 hover:scale-[1.02]">
                <div className="w-full h-full bg-[#F7F9FC] flex items-center justify-center overflow-hidden relative">
                  <NextImage
                    src="/home.png"
                    alt="Ignitor Dashboard"
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-[#FF5252] px-3 py-1 text-white font-bold transform rotate-[-5deg] shadow-[2px_2px_0px_#000] text-sm border-2 border-black">
                  Dashboard
                </div>
              </div>
              
              {/* Small Screenshot 2 */}
              <div className="col-span-6 md:col-span-4 aspect-square neo-shadow bg-white p-3 transform -rotate-2 hover:rotate-0 transition-all hover:z-10 hover:scale-[1.02]">
                <div className="w-full h-full bg-[#F7F9FC] flex items-center justify-center overflow-hidden relative">
                  <NextImage
                    src="/import.png"
                    alt="Game Import"
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="absolute -bottom-3 -left-3 bg-[#2FB8AC] px-3 py-1 text-white font-bold transform rotate-[-5deg] shadow-[2px_2px_0px_#000] text-sm border-2 border-black">
                  Game Import
                </div>
              </div>
              
              {/* Small Screenshot 3 */}
              <div className="col-span-6 md:col-span-3 aspect-[3/4] neo-shadow bg-white p-3 transform rotate-3 hover:rotate-0 transition-all hover:z-10 hover:scale-[1.02]">
                <div className="w-full h-full bg-[#F7F9FC] flex items-center justify-center overflow-hidden relative">
                  <NextImage
                    src="/library.png"
                    alt="Game Library"
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-[#FFD42A] px-3 py-1 text-black font-bold transform rotate-[5deg] shadow-[2px_2px_0px_#000] text-sm border-2 border-black">
                  Library
                </div>
              </div>
              
              {/* Medium Screenshot 4 */}
              <div className="col-span-12 md:col-span-5 aspect-video neo-shadow bg-white p-3 transform -rotate-1 hover:rotate-0 transition-all hover:z-10 hover:scale-[1.02]">
                <div className="w-full h-full bg-[#F7F9FC] flex items-center justify-center overflow-hidden relative">
                  <NextImage
                    src="/stats.png"
                    alt="Gaming Statistics"
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="absolute -top-3 -left-3 bg-[#3B82F6] px-3 py-1 text-white font-bold transform rotate-[-5deg] shadow-[2px_2px_0px_#000] text-sm border-2 border-black">
                  Stats
                </div>
              </div>
              
              {/* Small Screenshot 5 */}
              <div className="col-span-6 md:col-span-4 aspect-square neo-shadow bg-white p-3 transform rotate-2 hover:rotate-0 transition-all hover:z-10 hover:scale-[1.02]">
                <div className="w-full h-full bg-[#F7F9FC] flex items-center justify-center overflow-hidden relative">
                  <NextImage
                    src="/store.png"
                    alt="Store"
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-[#FF7B7B] px-3 py-1 text-white font-bold transform rotate-[5deg] shadow-[2px_2px_0px_#000] text-sm border-2 border-black">
                  Store
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-20 px-6 md:px-10 bg-[#FF5252] border-y-4 border-black relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black uppercase mb-6 transform -rotate-1 bg-black text-white inline-block px-4 py-2 font-[family-name:var(--font-archivo)]">
              Get Started Today
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white font-bold">
              Download Ignitor now and experience a new way to manage and enjoy your games.
            </p>
            <button 
              onClick={handleDownloadClick}
              className="bg-white px-10 py-5 neo-button hover:shadow-[10px_10px_0px_#000] shadow-[8px_8px_0px_#000] text-xl text-black"
            >
              Download for Windows
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-10 px-6 md:px-10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FF5252] border-2 border-white flex items-center justify-center font-bold text-white transform -rotate-3">
                IG
              </div>
              <h3 className="text-xl font-black transform rotate-1 font-[family-name:var(--font-archivo)]">Ignitor</h3>
            </div>
            <p className="text-sm text-gray-400">&copy; 2024 Ignitor Game Launcher Team</p>
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

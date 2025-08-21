"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X, Music } from "lucide-react";
import Image from "next/image";

export default function RhythmGameSongSelector() {
  const [songDatabase, setSongDatabase] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [excludedSongs, setExcludedSongs] = useState([]);
  const [finalSets, setFinalSets] = useState({
    set1: [],
    set2: [],
  });
  const [playingSong, setPlayingSong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getimage`);
        const resp = await response.json();

        if (!resp.error) {
          if (Object.keys(resp.data).length > 0) {
            setSongDatabase(resp.data);
          } else {
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 배열 무작위 섞기 함수
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 게임 시작 함수
  const startGame = () => {
    const shuffled = shuffleArray(selectedSongs);
    setShuffledSongs(shuffled);
    setExcludedSongs([]);
    setFinalSets({ set1: [], set2: [] });
    setPlayingSong([]);
  };

  // 곡 제외/포함 토글 함수
  const toggleExcludeSong = (index) => {
    const isExcluded = excludedSongs.includes(index);

    if (isExcluded) {
      // 목록에서 제거
      setExcludedSongs((prev) => prev.filter((i) => i !== index));
    } else {
      if (excludedSongs.length >= 4) {
        alert("최대 4개의 곡만 제외할 수 있습니다!");
        return;
      }
      setExcludedSongs((prev) => [...prev, index]);
    }
  };

  // 최종 게임 진행 함수
  const proceedToGame = () => {
    // 제외되지 않은 4곡 필터링
    const remainingSongs = shuffledSongs
      .map((song, index) => {
        return {
          index: index,
          song: song,
        };
      })
      .filter((item) => !excludedSongs.includes(item.index));

    if (remainingSongs.length !== 4) {
      alert("정확히 4곡을 남겨야 합니다!");
      return;
    }

    // 4곡을 무작위로 섞기
    const shuffledRemaining = shuffleArray(remainingSongs);

    // 2곡씩 나누어 set 구성
    setFinalSets({
      set1: shuffledRemaining.slice(0, 2),
      set2: shuffledRemaining.slice(2, 4),
    });
  };

  // 검색 결과 필터링
  const filteredSongs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return songDatabase;
    return songDatabase.filter((song) => {
      const musicNameMatch = song.musicname?.toLowerCase().includes(term);
      const subNameMatch = song.subname?.includes(term);
      return musicNameMatch || subNameMatch;
    });
  }, [searchTerm, songDatabase]);

  // 곡 선택 함수
  const selectSong = (song) => {
    if (selectedSongs.length >= 8) {
      alert("최대 8개의 곡만 선택할 수 있습니다!");
      return;
    }

    setSelectedSongs((prev) => [...prev, song]);
  };

  // 선택된 곡 제거 함수
  const removeSong = (songToRemove) => {
    setSelectedSongs((prev) =>
      prev.filter((song) => song.musicname !== songToRemove.musicname)
    );
  };

  // 플레이 중인 곡 설정 함수
  const handleImageClick = (item, index) => {
    setPlayingSong({
      ...item.song,
      index: index + 1,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 제목 */}
      <div className="select-none text-center">
        <h1 className="text-3xl font-bold mb-2">리듬게임 곡 선택</h1>
        <p className="text-muted-foreground">최대 8개의 곡을 선택하세요</p>
      </div>

      {/* 검색 섹션 */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="곡 제목을 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 선택된 곡 개수 표시 */}
      <div className="select-none flex justify-between items-center">
        <Badge variant="secondary" className="text-sm">
          선택된 곡: {selectedSongs.length}/8
        </Badge>
        {selectedSongs.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedSongs([]);
              setShuffledSongs([]);
              setExcludedSongs([]);
              setFinalSets({ set1: [], set2: [] });
            }}
          >
            전체 해제
          </Button>
        )}
      </div>

      {/* 검색 결과 */}
      <Card>
        <CardContent className="select-none p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Music className="h-5 w-5" />
            검색 결과 ({filteredSongs.length}개)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-h-96 overflow-y-auto">
            {filteredSongs.map((song, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => selectSong(song)}
              >
                <CardContent className="p-3">
                  <div className="aspect-square mb-2 relative overflow-hidden rounded-md">
                    <Image
                      src={song.imglink || "/placeholder.svg"}
                      alt={song.musicname}
                      unoptimized={true}
                      fill
                      className={`object-cover border-8 ${
                        song.difficulty === "MAS"
                          ? "border-[#9F51DC]"
                          : song.difficulty === "ReMAS"
                          ? "border-[#DBAAFF]"
                          : "border-[#FF6666]"
                      }`}
                    />
                    {song.dxstd == "DX" && (
                      <Image
                        src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                        alt="DX Image"
                        unoptimized={true}
                        width={64}
                        height={64}
                        className="absolute top-[80%] left-[44%] w-[50%]"
                      />
                    )}
                    {song.dxstd == "STD" && (
                      <Image
                        src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                        alt="DX Image"
                        unoptimized={true}
                        width={64}
                        height={64}
                        className="absolute top-[80%] left-[44%] w-[50%]"
                      />
                    )}
                  </div>
                  <p className="text-sm font-medium text-center truncate">
                    {song.musicname}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredSongs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          )}
        </CardContent>
      </Card>

      {/* 선택된 곡 리스트 */}
      {selectedSongs.length > 0 && (
        <Card>
          <CardContent className="select-none p-6">
            <h2 className="text-xl font-semibold mb-4">선택된 곡 목록</h2>
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 8 }, (_, index) => {
                const song = selectedSongs[index];
                return (
                  <div
                    key={index}
                    className="aspect-square relative rounded-md overflow-hidden border-2 border-dashed border-gray-300"
                  >
                    {song ? (
                      <>
                        <Image
                          src={song.imglink || "/placeholder.svg"}
                          alt={song.musicname}
                          fill
                          unoptimized={true}
                          className={`object-cover border-8 ${
                            song.difficulty === "MAS"
                              ? "border-[#9F51DC]"
                              : song.difficulty === "ReMAS"
                              ? "border-[#DBAAFF]"
                              : "border-[#FF6666]"
                          }`}
                        />
                        {song.dxstd == "DX" && (
                          <Image
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                            alt="DX Image"
                            width={64}
                            height={64}
                            unoptimized={true}
                            className="absolute top-[80%] left-[44%] w-[50%]"
                          />
                        )}
                        {song.dxstd == "STD" && (
                          <Image
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                            alt="DX Image"
                            width={64}
                            height={64}
                            unoptimized={true}
                            className="absolute top-[80%] left-[44%] w-[50%]"
                          />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                          onClick={() => removeSong(song)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                          {index + 1}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="text-2xl font-bold">{index + 1}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {selectedSongs.length <= 8 && (
              <div className="mt-4 text-center">
                <Button size="lg" onClick={startGame} className="px-8">
                  게임 시작
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 무작위로 섞인 곡들의 이미지 1x8 배열 표시 */}
      {finalSets.set1.length === 0 && shuffledSongs.length >= 1 && (
        <Card>
          <CardContent className="select-none bg-[#FF3399] bg-cover bg-center bg-no-repeat opacity-90 p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              게임 순서 (무작위)
            </h2>
            {finalSets.set1.length === 0 && (
              <p className="text-center text-muted-foreground mb-4">
                곡을 클릭하여 제외하세요
              </p>
            )}
            {finalSets.set1.length === 0 && (
              <div className="flex justify-center mb-4">
                {/* 제외된 곡 개수 표시 */}
                {(() => {
                  const maxExcludable = Math.max(0, shuffledSongs.length - 4);
                  return (
                    <Badge
                      variant="outline"
                      className="text-sm bg-white/90 px-4 py-2"
                    >
                      제외된 곡: {excludedSongs.length}/{maxExcludable}
                    </Badge>
                  );
                })()}
              </div>
            )}
            <div
              className={`grid gap-2 my-20`}
              style={{
                gridTemplateColumns: `repeat(8, 1fr)`,
              }}
            >
              {shuffledSongs.map((song, index) => {
                const isExcluded = excludedSongs.includes(index);
                return (
                  <div className="relative">
                    <div
                      key={index}
                      className={`relative cursor-pointer transition-all border-8 ${
                        song.difficulty === "MAS"
                          ? "border-[#9F51DC]"
                          : song.difficulty === "ReMAS"
                          ? "border-[#DBAAFF]"
                          : "border-[#FF6666]"
                      }`}
                      style={{
                        filter: isExcluded ? "brightness(0.3)" : "",
                      }}
                      onClick={
                        finalSets.set1.length === 0
                          ? (e) => {
                              toggleExcludeSong(index);
                            }
                          : ""
                      }
                    >
                      <Image
                        src={song.imglink || "/placeholder.svg"}
                        alt={song.musicname}
                        width={190}
                        height={190}
                        unoptimized={true}
                        className={`aspect-square overflow-hidden`}
                      />
                      {song.dxstd == "DX" && (
                        <Image
                          src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                          alt="DX Image"
                          width={64}
                          height={64}
                          unoptimized={true}
                          className="absolute top-[83%] left-[40%] w-[59%]"
                        />
                      )}
                      {song.dxstd == "STD" && (
                        <Image
                          src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                          alt="DX Image"
                          width={64}
                          height={64}
                          unoptimized={true}
                          className="absolute top-[83%] left-[40%] w-[59%]"
                        />
                      )}
                    </div>
                    {isExcluded && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <X className="text-white h-24 w-24" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {finalSets.set1.length === 0 && (
              <div className="mt-4 text-center space-x-4">
                {(() => {
                  const maxExcludable = Math.max(0, shuffledSongs.length - 2);
                  return (
                    <Button
                      size="lg"
                      onClick={proceedToGame}
                      disabled={shuffledSongs.length - excludedSongs.length < 2}
                      className="px-8"
                    >
                      게임 진행
                    </Button>
                  );
                })()}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={startGame}
                  className="px-8 bg-white/90"
                >
                  다시 섞기
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 최종 게임 세트 표시 */}
      {finalSets.set1.length > 0 && finalSets.set2.length > 0 && (
        <Card>
          <CardContent className="select-none bg-[#FF3399] bg-cover bg-center bg-no-repeat p-6 opacity-90">
            <h2 className="select-none text-xl font-semibold mb-6 text-center">
              최종 게임 세트
            </h2>
            <div className="grid grid-cols-2 my-20">
              {/* 1 Set */}
              <div className="flex justify-center items-center flex-col">
                <Badge
                  variant="outline"
                  className="w-auto bg-white/90 px-4 py-2 text-sm font-large my-4 shadow-lg"
                >
                  1 Set
                </Badge>
                <div className="grid grid-cols-2 gap-8">
                  {finalSets.set1.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex ${
                          index % 2 === 0 ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`relative w-32 h-32 border-8 ${
                            item.song.difficulty === "MAS"
                              ? "border-[#9F51DC]"
                              : item.song.difficulty === "ReMAS"
                              ? "border-[#DBAAFF]"
                              : "border-[#FF6666]"
                          } relative overflow-hidden cursor-pointer`}
                          onClick={() => handleImageClick(item, index)}
                        >
                          <Image
                            src={item.song.imglink || "/placeholder.svg"}
                            alt={item.song.musicname}
                            fill
                            unoptimized={true}
                            className="object-cover"
                          />
                          {item.song.dxstd == "DX" && (
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                              alt="DX Image"
                              width={64}
                              height={64}
                              unoptimized={true}
                              className="absolute top-[83%] left-[40%] w-[59%]"
                            />
                          )}
                          {item.song.dxstd == "STD" && (
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                              alt="DX Image"
                              width={64}
                              height={64}
                              unoptimized={true}
                              className="absolute top-[83%] left-[40%] w-[59%]"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2 Set */}
              <div className="flex justify-center items-center flex-col">
                <Badge
                  variant="outline"
                  className="w-auto bg-white/90 px-4 py-2 text-sm font-large my-4 shadow-lg"
                >
                  2 Set
                </Badge>
                <div className="grid grid-cols-2 gap-8">
                  {finalSets.set2.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex ${
                          index % 2 === 0 ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`relative w-32 h-32 border-8 ${
                            item.song.difficulty === "MAS"
                              ? "border-[#9F51DC]"
                              : item.song.difficulty === "ReMAS"
                              ? "border-[#DBAAFF]"
                              : "border-[#FF6666]"
                          } relative overflow-hidden cursor-pointer`}
                          onClick={() => handleImageClick(item, index + 2)}
                        >
                          <Image
                            src={item.song.imglink || "/placeholder.svg"}
                            alt={item.song.musicname}
                            fill
                            unoptimized={true}
                            className="object-cover"
                          />
                          {item.song.dxstd == "DX" && (
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                              alt="DX Image"
                              width={64}
                              height={64}
                              unoptimized={true}
                              className="absolute top-[83%] left-[40%] w-[59%]"
                            />
                          )}
                          {item.song.dxstd == "STD" && (
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                              alt="DX Image"
                              width={64}
                              height={64}
                              unoptimized={true}
                              className="absolute top-[83%] left-[40%] w-[59%]"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button
                size="lg"
                onClick={() => {
                  setFinalSets({ set1: [], set2: [] });
                }}
                className="px-8"
              >
                뒤로 가기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 플레이되고 있는 곡 정보 표시 */}
      {/* 선택된 곡 정보 카드 */}
      {finalSets.set1.length > 0 &&
        finalSets.set2.length > 0 &&
        playingSong.imglink && (
          <div className="select-none w-full max-w-4xl mx-auto">
            <Card className="overflow-hidden bg-white border border-gray-200 shadow-2xl">
              <CardContent className="p-0">
                <div className="flex items-center relative">
                  {/* Background subtle effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white" />

                  {/* Image Section */}
                  <div className="relative flex-shrink-0 p-4">
                    <div className="relative">
                      <Image
                        src={
                          playingSong.imglink ||
                          "/placeholder.svg?height=200&width=200"
                        }
                        alt={playingSong.musicname}
                        width={200}
                        height={200}
                        unoptimized={true}
                        className="object-cover rounded-xl shadow-lg ring-2 ring-gray-200"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 space-y-6 relative z-10">
                    {/* Set and Track Info */}
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="outline"
                        className="bg-gray-800 text-white text-lg px-4 py-2 font-bold"
                      >
                        Set {Math.floor((playingSong.index + 1) / 2)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-gray-400 text-gray-700 text-lg px-4 py-2 font-bold"
                      >
                        Track {playingSong.index} / 4
                      </Badge>
                    </div>

                    {/* Music Name */}
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                        {playingSong.musicname}
                      </h1>
                    </div>

                    {/* Difficulty and Level Info */}
                    <div className="flex items-center gap-6">
                      {/* Difficulty Images */}
                      <div className="flex items-center gap-3">
                        {playingSong.difficulty === "MAS" && (
                          <div className="relative">
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/diff_master.png"
                              alt="Master Difficulty"
                              width={64}
                              height={64}
                              unoptimized={true}
                              className="w-24 drop-shadow-lg"
                            />
                          </div>
                        )}
                        {playingSong.difficulty === "ReMAS" && (
                          <div className="relative">
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/diff_remaster.png"
                              alt="Re:Master Difficulty"
                              width={64}
                              height={64}
                              unoptimized={true}
                              className="w-24 drop-shadow-lg"
                            />
                          </div>
                        )}

                        {playingSong.dxstd === "DX" && (
                          <Image
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                            alt="DX Chart"
                            width={64}
                            height={64}
                            unoptimized={true}
                            className="w-24 drop-shadow-lg"
                          />
                        )}
                        {playingSong.dxstd === "STD" && (
                          <Image
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                            alt="Standard Chart"
                            width={64}
                            height={64}
                            unoptimized={true}
                            className="w-24 drop-shadow-lg"
                          />
                        )}
                      </div>

                      {/* Level Display */}
                      <div className="flex items-center gap-3">
                        {/*
                        <span className="text-2xl font-bold text-gray-700">
                          Level:
                        </span>
                        */}
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-black text-2xl shadow-lg">
                          Level{" "}
                          {playingSong.level < 14
                            ? "13+"
                            : playingSong.level < 14.6
                            ? "14"
                            : playingSong.level < 15
                            ? "14+"
                            : "15"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
    </div>
  );
}

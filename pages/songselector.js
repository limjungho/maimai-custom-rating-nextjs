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
          borderColor: borderColor[index],
          dxstdbutton: dxstdbutton[index],
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
    if (!searchTerm.trim()) return songDatabase;
    return songDatabase.filter((song) =>
      song.musicname.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  const colors = ["#C27FF4", "#E5DDEA"];
  const [borderColor, setBorderColor] = useState(() =>
    Array(8).fill(colors[0])
  );

  // border 클릭 시 색상 변경
  const handleBorderClick = (idx) => {
    const currentIndex = colors.indexOf(borderColor[idx]);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    const newBorderColors = [...borderColor];
    newBorderColors[idx] = nextColor; // 해당 인덱스의 색상만 변경
    setBorderColor(newBorderColors);
  };

  const dxstd = ["dx", "std"];
  const [dxstdbutton, setdxstdbutton] = useState(() => Array(8).fill(dxstd[0]));

  // border 클릭 시 색상 변경
  const handledxstdClick = (idx) => {
    const currentIndex = dxstd.indexOf(dxstdbutton[idx]);
    const nextdxstd = dxstd[(currentIndex + 1) % dxstd.length];
    const newdxstd = [...dxstdbutton];
    newdxstd[idx] = nextdxstd;
    setdxstdbutton(newdxstd);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 제목 */}
      <div className="text-center">
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
      <div className="flex justify-between items-center">
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
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Music className="h-5 w-5" />
            검색 결과 ({filteredSongs.length}개)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-96 overflow-y-auto">
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
                      fill
                      className="object-cover"
                    />
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
          <CardContent className="p-6">
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
                          className="object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                          onClick={() => removeSong(song)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
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
          <CardContent className="bg-[url('/phase2.png')] bg-cover bg-center bg-no-repeat p-6">
            <h2 className="select-none text-xl font-semibold mb-4 text-center">
              게임 순서 (무작위)
            </h2>
            {finalSets.set1.length === 0 && (
              <p className="select-none text-center text-muted-foreground mb-4">
                곡을 클릭하여 제외하세요
              </p>
            )}
            {finalSets.set1.length === 0 && (
              <div className="flex justify-center mb-4">
                {/* 제외된 곡 개수 표시 */}
                {(() => {
                  const maxExcludable = Math.max(0, shuffledSongs.length - 4);
                  return (
                    <Badge variant="outline" className="select-none text-sm">
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
                  <div
                    key={index}
                    className={`cursor-pointer transition-all border-8`}
                    style={{
                      borderColor: borderColor[index],
                      filter: isExcluded ? "brightness(0.3)" : "",
                    }}
                    onClick={
                      finalSets.set1.length === 0
                        ? () => handleBorderClick(index)
                        : undefined
                    }
                  >
                    <div className="relative">
                      <Image
                        src={song.imglink || "/placeholder.svg"}
                        alt={song.musicname}
                        width={190}
                        height={190}
                        className={`aspect-square overflow-hidden`}
                        onClick={
                          finalSets.set1.length === 0
                            ? (e) => {
                                e.stopPropagation();
                                toggleExcludeSong(index);
                              }
                            : ""
                        }
                      />
                      {dxstdbutton[index] == "dx" && (
                        <Image
                          src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                          alt="DX Image"
                          width={64}
                          height={64}
                          className="absolute top-[83%] left-[40%] w-[59%]"
                          onClick={
                            finalSets.set1.length === 0
                              ? (e) => {
                                  e.stopPropagation();
                                  handledxstdClick(index);
                                }
                              : undefined
                          }
                        />
                      )}
                      {dxstdbutton[index] == "std" && (
                        <Image
                          src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                          alt="DX Image"
                          width={64}
                          height={64}
                          className="absolute top-[83%] left-[40%] w-[59%]"
                          onClick={
                            finalSets.set1.length === 0
                              ? (e) => {
                                  e.stopPropagation();
                                  handledxstdClick(index);
                                }
                              : undefined
                          }
                        />
                      )}
                      {isExcluded && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <X className="text-white h-24 w-24" />
                        </div>
                      )}
                    </div>
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
                  className="px-8 bg-transparent"
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
          <CardContent className="bg-[url('/phase2.png')] bg-cover bg-center bg-no-repeat p-6">
            <h2 className="select-none text-xl font-semibold mb-6 text-center">
              최종 게임 세트
            </h2>
            <div className="grid grid-cols-2 my-20">
              {/* 1 Set */}
              <div>
                <h3 className="select-none text-lg font-semibold mb-4 text-center">
                  1 Set
                </h3>
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
                          className={`relative w-32 h-32 border-8 relative overflow-hidden`}
                          style={{ borderColor: item.borderColor }}
                        >
                          <Image
                            src={item.song.imglink || "/placeholder.svg"}
                            alt={item.song.musicname}
                            fill
                            className="object-cover"
                          />
                          {item.dxstdbutton == "dx" && (
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                              alt="DX Image"
                              width={64}
                              height={64}
                              className="absolute top-[83%] left-[40%] w-[59%]"
                            />
                          )}
                          {item.dxstdbutton == "std" && (
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                              alt="DX Image"
                              width={64}
                              height={64}
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
              <div>
                <h3 className="select-none text-lg font-semibold mb-4 text-center">
                  2 Set
                </h3>
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
                          className={`relative w-32 h-32 border-8 relative overflow-hidden`}
                          style={{ borderColor: item.borderColor }}
                        >
                          <Image
                            src={item.song.imglink || "/placeholder.svg"}
                            alt={item.song.musicname}
                            fill
                            className="object-cover"
                          />
                          {item.dxstdbutton == "dx" && (
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                              alt="DX Image"
                              width={64}
                              height={64}
                              className="absolute top-[83%] left-[40%] w-[59%]"
                            />
                          )}
                          {item.dxstdbutton == "std" && (
                            <Image
                              src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                              alt="DX Image"
                              width={64}
                              height={64}
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
    </div>
  );
}

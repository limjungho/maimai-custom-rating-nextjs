"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, X, Music, Play } from "lucide-react";
import Image from "next/image";

// 샘플 데이터
const songDatabase = [
  { title: "Electric Dreams", image: "/placeholder.svg?height=120&width=120" },
  { title: "Neon Nights", image: "/placeholder.svg?height=120&width=120" },
  { title: "Cyber Pulse", image: "/placeholder.svg?height=120&width=120" },
  { title: "Digital Storm", image: "/placeholder.svg?height=120&width=120" },
  {
    title: "Synthwave Paradise",
    image: "/placeholder.svg?height=120&width=120",
  },
  { title: "Retro Future", image: "/placeholder.svg?height=120&width=120" },
  { title: "Pixel Dance", image: "/placeholder.svg?height=120&width=120" },
  { title: "Binary Beat", image: "/placeholder.svg?height=120&width=120" },
  { title: "Quantum Rhythm", image: "/placeholder.svg?height=120&width=120" },
  { title: "Matrix Melody", image: "/placeholder.svg?height=120&width=120" },
  { title: "Hologram Harmony", image: "/placeholder.svg?height=120&width=120" },
  { title: "Virtual Vibes", image: "/placeholder.svg?height=120&width=120" },
  { title: "Techno Thunder", image: "/placeholder.svg?height=120&width=120" },
  { title: "Laser Light", image: "/placeholder.svg?height=120&width=120" },
  { title: "Chrome City", image: "/placeholder.svg?height=120&width=120" },
  { title: "Neon Genesis", image: "/placeholder.svg?height=120&width=120" },
  { title: "Cyber Symphony", image: "/placeholder.svg?height=120&width=120" },
  { title: "Digital Dawn", image: "/placeholder.svg?height=120&width=120" },
  { title: "Electric Echo", image: "/placeholder.svg?height=120&width=120" },
  { title: "Future Funk", image: "/placeholder.svg?height=120&width=120" },
];

export default function SongSelector() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState(Array(8).fill(null));

  // 검색 결과 필터링
  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songDatabase;
    return songDatabase.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // 곡 선택 함수
  const selectSong = (song) => {
    // 이미 선택된 곡인지 확인
    if (selectedSongs.some((selected) => selected?.title === song.title)) {
      alert("이미 선택된 곡입니다!");
      return;
    }

    // 첫 번째 빈 슬롯 찾기
    const emptyIndex = selectedSongs.findIndex((slot) => slot === null);
    if (emptyIndex === -1) {
      alert("모든 슬롯이 채워졌습니다!");
      return;
    }

    // 슬롯에 곡 추가
    const newSelectedSongs = [...selectedSongs];
    newSelectedSongs[emptyIndex] = song;
    setSelectedSongs(newSelectedSongs);
  };

  // 곡 제거 함수
  const removeSong = (index) => {
    const newSelectedSongs = [...selectedSongs];
    newSelectedSongs[index] = null;
    setSelectedSongs(newSelectedSongs);
  };

  // 선택된 곡인지 확인
  const isSelected = (songTitle) => {
    return selectedSongs.some((song) => song?.title === songTitle);
  };

  // 선택된 곡 개수
  const selectedCount = selectedSongs.filter((song) => song !== null).length;

  // 전체 초기화
  const clearAll = () => {
    setSelectedSongs(Array(8).fill(null));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Music className="w-8 h-8" />
          리듬게임 곡 선택
        </h1>
        <p className="text-muted-foreground">
          곡을 선택하면 바로 슬롯에 추가됩니다
        </p>
      </div>

      {/* 곡 검색 및 목록 - 위로 이동 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />곡 검색 및 선택
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="곡 제목을 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {filteredSongs.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                검색 결과가 없습니다
              </div>
            ) : (
              filteredSongs.map((song, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    isSelected(song.title)
                      ? "bg-primary/10 border-primary/50"
                      : "hover:bg-muted/50 hover:border-muted-foreground/50"
                  }`}
                >
                  <Image
                    src={song.image || "/placeholder.svg"}
                    alt={song.title}
                    width={40}
                    height={40}
                    className="rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{song.title}</h3>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => selectSong(song)}
                    disabled={isSelected(song.title) || selectedCount >= 8}
                    className="shrink-0"
                  >
                    {isSelected(song.title) ? (
                      <Badge variant="secondary" className="px-2 py-1">
                        선택됨
                      </Badge>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* 8개 슬롯 그리드 - 아래로 이동 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              선택된 곡 ({selectedCount}/8)
            </CardTitle>
            {selectedCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearAll}>
                전체 초기화
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-4 mb-6">
            {selectedSongs.map((song, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 flex items-center justify-center overflow-hidden">
                  {song ? (
                    <>
                      <Image
                        src={song.image || "/placeholder.svg"}
                        alt={song.title}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeSong(index)}
                          className="rounded-full w-8 h-8 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-2 text-xs font-medium truncate">
                        {song.title}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">슬롯 {index + 1}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 게임 시작 버튼 */}
          {selectedCount > 0 && (
            <div className="text-center">
              <Button size="lg" className="px-8">
                <Play className="w-5 h-5 mr-2" />
                게임 시작 ({selectedCount}곡)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

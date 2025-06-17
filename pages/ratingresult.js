"use client";

import Head from "next/head";
//import styles from "../styles/rating.css";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  const router = useRouter();
  const { friendcode } = router.query; // URL 쿼리 파라미터에서 'friendcode' 변수를 가져옵니다.
  const [userdata, setuserdata] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [fc, setfc] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const sortData = (data) => {
    const sortedData = data.sort(
      (a, b) =>
        b.musicrating - a.musicrating ||
        b.musicscore.localeCompare(a.musicscore) ||
        a.musicname.localeCompare(b.musicname)
    );
    return sortedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (friendcode) {
        const regex = /^\d+$/;
        if (!regex.test(friendcode)) {
          setIsValid(false);
          alert("Friendcode는 숫자로만 이루어져야 합니다.");
        } else {
          setIsValid(true);
          setfc(friendcode);

          try {
            const response = await fetch(
              `/api/getinfo?friendcode=${friendcode}`
            );
            const resp = await response.json();

            if (!resp.error) {
              if (Object.keys(resp.data).length > 0) {
                setIsRegistered(true);
                setuserdata(sortData(resp.data));
              } else {
                setIsRegistered(false);
              }

              setIsLoaded(true);
            }
          } catch (error) {
            console.error("Error checking friendcode:", error);
          }
        }
      }
    };
    fetchData();
  }, [friendcode]);

  if (!userdata) {
    return (
      <div className="h-screen">
        <LoadingScreen />
      </div>
    );
  }
  // 50 music data
  const musicData = Array.from({ length: 50 }, (_, index) => ({
    no: index + 1,
    musicname: `${userdata[index].musicname}`,
    dxStd: `${userdata[index].dxstd}`,
    difficulty: `${userdata[index].difficulty}`,
    level: `${Number(userdata[index].level).toFixed(1)}`,
    score: `${userdata[index].musicscore}`,
    fcap: `${userdata[index].fcap}`,
    musicRating: `${userdata[index].musicrating}`,
  }));

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EXP":
        return "bg-[#FA6C75]";
      case "MAS":
        return "bg-[#C27FF4]";
      case "ReMAS":
        return "bg-[#E5DDEA] text-black";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Player Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Player Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Your Friend Code
              </p>
              <p className="text-lg font-mono">{fc}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Player Name
              </p>
              <p className="text-lg font-bold">
                {isLoaded && userdata?.[0].playername}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Recent Update Time
              </p>
              <p className="text-lg">{isLoaded && userdata?.[0].update_time}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Your Original Rating
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {isLoaded && userdata?.[0].originalrating}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Your Custom Rating
              </p>
              <p className="text-2xl font-bold text-green-600">
                {isLoaded && userdata?.[0].customrating}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Music Score Table */}
      <Card>
        <CardHeader>
          <CardTitle>In Rating Music List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">No.</TableHead>
                  <TableHead className="min-w-[200px]">Musicname</TableHead>
                  <TableHead className="w-[90px]">DX STD</TableHead>
                  <TableHead className="w-[120px]">Difficulty</TableHead>
                  <TableHead className="w-[90px]">Level</TableHead>
                  <TableHead className="w-[130px]">Score</TableHead>
                  <TableHead className="w-[80px]">FC / AP</TableHead>
                  <TableHead className="w-[120px]">Music Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoaded &&
                  musicData.map((music) => (
                    <TableRow
                      key={music.no}
                      className="hover:bg-muted/50 h-[60px]"
                    >
                      <TableCell className="font-medium text-base">
                        {music.no}
                      </TableCell>
                      <TableCell className="font-medium text-base">
                        {music.musicname}
                      </TableCell>
                      <TableCell>
                        {music.dxStd === "DX" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png"
                            alt="DX Image"
                          />
                        ) : music.dxStd === "STD" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_standard.png"
                            alt="STD Image"
                          />
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {music.difficulty === "EXP" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/diff_expert.png"
                            alt="EXP Image"
                            className="w-[80%] h-auto"
                          />
                        ) : music.difficulty === "MAS" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/diff_master.png"
                            alt="MAS Image"
                            className="w-[80%] h-auto"
                          />
                        ) : music.difficulty === "ReMAS" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/diff_remaster.png"
                            alt="ReMAS Image"
                            className="w-[80%] h-auto"
                          />
                        ) : null}
                      </TableCell>
                      <TableCell className="font-mono text-base">
                        {music.level}
                      </TableCell>
                      <TableCell className="font-mono text-base">
                        {music.score}
                      </TableCell>
                      <TableCell>
                        {music.fcap === "FC" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_icon_fc.png"
                            alt="FC Image"
                            class-Name="w-[30%] h-auto"
                          />
                        ) : music.fcap === "FC+" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_icon_fcp.png"
                            alt="FC+ Image"
                            class-Name="w-[30%] h-auto"
                          />
                        ) : music.fcap === "AP" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_icon_ap.png"
                            alt="AP Image"
                            class-Name="w-[30%] h-auto"
                          />
                        ) : music.fcap === "AP+" ? (
                          <img
                            src="https://maimaidx-eng.com/maimai-mobile/img/music_icon_app.png"
                            alt="AP+ Image"
                            class-Name="w-[30%] h-auto"
                          />
                        ) : null}
                      </TableCell>
                      <TableCell className="font-mono font-bold text-base">
                        {music.musicRating}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

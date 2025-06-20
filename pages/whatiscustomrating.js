import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Trophy, Target, Zap, Award, Info } from "lucide-react";
import Head from "next/head";

export default function whatiscustomrating() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Head>
        <title>maimaiDX Custom Rating</title>
        <meta name="description" content="Main Page" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="maimaiDX Custom Rating" />
        <meta
          property="og:description"
          content="maimaiDX 커스텀 레이팅 웹서비스"
        />
        <meta
          property="og:image"
          content="https://www.maimaicustomrating.site/ogImage.png"
        />
        <meta
          property="og:url"
          content="https://www.maimaicustomrating.site/"
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r text-purple-600">
              Custom Rating
            </h1>
            <Star className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            상위권 유저들을 위한 세분화된 평점 시스템
          </p>
        </div>

        {/* Main Description */}
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Info className="w-5 h-5" />
              Custom Rating이란?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              기존의 Rating에서 상위권 유저들을 위한{" "}
              <span className="font-semibold text-purple-600">
                세분화된 Custom Rating
              </span>{" "}
              입니다.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Target className="w-5 h-5" />
                계산 방식
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-sm">
                    신곡/구곡 구분 없음
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rating 상위{" "}
                  <span className="font-semibold text-blue-600">50곡</span>에
                  대해 계산합니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Zap className="w-5 h-5" />
                레벨 제한
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 text-sm pointer-events-none">
                    레벨 13 이상
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  12+ 이하의 보면은 Custom Rating 대상에서 제외됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bonus Points System */}
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              추가 Rating 점수 시스템
            </CardTitle>
            <CardDescription>
              100.5000%(SSS+) 이상의 성과에 대한 보너스 점수
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">%</span>
                    </div>
                    <div>
                      <p className="font-semibold">
                        Achievement 100.8000% 이상
                      </p>
                      <p className="text-sm text-muted-foreground">
                        AP에 가까워지는 달성도
                      </p>
                    </div>
                  </div>
                  <Badge className="w-15 bg-purple-500 text-white text-base truncate shrink-0 pointer-events-none">
                    +3점
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">FC+</span>
                    </div>
                    <div>
                      <p className="font-semibold">FULL COMBO+ 달성</p>
                      <p className="text-sm text-muted-foreground">
                        FULL SYNC DX에 필요한 FULL COMBO+ 조건
                      </p>
                    </div>
                  </div>
                  <Badge className="w-15 bg-blue-500 text-white text-base truncate shrink-0 pointer-events-none">
                    +1점
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">AP</span>
                    </div>
                    <div>
                      <p className="font-semibold">ALL PERFECT 달성</p>
                      <p className="text-sm text-muted-foreground">
                        FULL COMBO+ 달성 이후 ALL PERFECT 달성 시 +2점
                      </p>
                    </div>
                  </div>
                  <Badge className="w-15 bg-amber-500 text-white text-base truncate shrink-0 pointer-events-none">
                    +3점
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    최대 획득 가능 점수
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  기존 Rating 대비 1곡에서{" "}
                  <span className="font-semibold text-green-600">최대 6점</span>
                  을 추가로 획득할 수 있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium mb-1 text-gray-900">참고사항</p>
                <p className="text-sm text-muted-foreground">
                  명시되지 않은 부분은 기존의 Rating과 동일하게 적용됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

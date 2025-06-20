"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bookmark,
  Copy,
  Settings,
  Play,
  Link,
  Globe,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import NextLink from "next/link";
import { toast } from "sonner";
import Head from "next/head";

export default function BookmarkGuide() {
  const bookmarkCode = `javascript:(()=>{var d=document,o=d.createElement('div'),p=0;o.innerHTML='<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:30px 40px;border-radius:10px;box-shadow:0 4px 16px #0004;z-index:999999;text-align:center;font-family:sans-serif;font-size:18px;"><div style="width:36px;height:36px;border:4px solid #ccc;border-top:4px solid #4CAF50;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 20px;"></div><style>@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style>Loading... <span id=pct>0%</span></div>';d.body.appendChild(o);var t=d.getElementById('pct'),i=setInterval(()=>{t.textContent=++p+'%';p>=100&&clearInterval(i)},160),s=d.createElement('script');s.src='https://www.maimaicustomrating.site/bookmark.js';s.onload=s.onerror=()=>setTimeout(()=>o.remove(),3e4);d.body.appendChild(s);setTimeout(()=>o.remove(),3e4)})();`;
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bookmarkCode);
      toast("북마크 코드가 클립보드에 복사되었습니다.", {});
    } catch (err) {
      toast("클립보드 복사에 실패했습니다. 수동으로 복사해주세요.", {
        variant: "destructive",
      });
    }
  };

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
            <Bookmark className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              북마크 설정 가이드
            </h1>
            <Settings className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            maimai DX NET에서 Custom Rating을 쉽게 업데이트하는 방법
          </p>
        </div>

        {/* Bookmark Registration Section */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-600" />
              북마크 등록
            </CardTitle>
            <CardDescription>
              브라우저에 Custom Rating 업데이트 북마크를 추가하는 방법
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  1
                </div>
                <h3 className="text-lg font-semibold">
                  하단의 링크를 복사합니다.
                </h3>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between gap-4">
                  <code className="text-sm bg-white p-2 rounded border flex-1 overflow-x-auto">
                    {bookmarkCode}
                  </code>
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    복사
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  2
                </div>
                <h3 className="text-lg font-semibold">
                  브라우저의 북마크 관리자를 엽니다.
                </h3>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 mb-2">
                      크롬 브라우저의 경우:
                    </p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>
                        • 단축키:{" "}
                        <Badge variant="outline" className="bg-white">
                          Ctrl+Shift+O
                        </Badge>
                        → 마우스 우클릭 → 새 북마크 추가
                      </div>
                      <p>
                        • 또는 더보기 → 북마크 및 목록 → 북마크 관리자 → 마우스
                        우클릭 → 새 북마크 추가
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  3
                </div>
                <h3 className="text-lg font-semibold">
                  Rating Update와 같은 이름으로 설정 후 1번의 링크를 붙여넣기
                  하여 추가합니다.
                </h3>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800">
                      북마크 설정 예시
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      이름: <span className="font-medium">Rating Update</span> |
                      URL:{" "}
                      <span className="font-medium">복사한 링크 붙여넣기</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookmark Execution Section */}
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-orange-600" />
              북마크 실행
            </CardTitle>
            <CardDescription>
              등록한 북마크를 사용하여 Custom Rating을 업데이트하는 방법
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  1
                </div>
                <h3 className="text-lg font-semibold">
                  maimai DX NET 홈페이지에 로그인합니다.
                </h3>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-800">
                      maimai DX NET 접속
                    </span>
                  </div>
                  <NextLink
                    className={buttonVariants({
                      variant: "outline",
                    })}
                    href="https://maimaidx-eng.com/"
                    target="_blank"
                  >
                    <ExternalLink className="w-4 h-4" />
                    링크
                  </NextLink>
                </div>
              </div>
            </div>

            <Separator />

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  2
                </div>
                <h3 className="text-lg font-semibold">
                  maimai DX NET 홈페이지에서 추가한 북마크를 클릭하고 알림 창이
                  뜨면 갱신이 완료됩니다.
                </h3>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">완료 확인</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      북마크 클릭 후 알림 창이 표시되면 Custom Rating 갱신이
                      성공적으로 완료된 것입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Tips */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium mb-2 text-gray-900">사용 팁</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • 북마크는 maimai DX NET에 로그인된 상태에서만 작동합니다.
                  </li>
                  <li>
                    • 정기적으로 북마크를 실행하여 최신 Custom Rating을
                    유지하세요.
                  </li>
                  <li>
                    • 북마크가 작동하지 않는 경우 페이지를 새로고침 후 다시
                    시도해보세요.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

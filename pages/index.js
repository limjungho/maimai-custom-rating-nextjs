"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/footer";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [friendcode, setfriendcode] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/ratingresult",
      query: { friendcode },
    });
  };

  const handleLinkClick = () => {
    window.open(
      "https://maimaidx-eng.com/maimai-mobile/friend/userFriendCode/",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
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
        <div className="w-full max-w-md space-y-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/maimaidxprism.jpg"
              alt="maimai Logo"
              width={300}
              height={120}
              className="mx-auto"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-normal text-gray-800 mb-8">
            maimaiDX Custom Rating
          </h1>

          {/* Friend Code Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3 max-w-sm mx-auto">
              <Input
                type="text"
                placeholder="Friend Code를 입력하세요"
                value={friendcode}
                onChange={(e) => setfriendcode(e.target.value)}
                className="flex-1 h-11 px-4 border border-gray-300 rounded-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                pattern="[0-9]*"
                inputMode="numeric"
              />
              <Button
                type="submit"
                className="h-11 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded-full font-medium"
                variant="outline"
              >
                검색
              </Button>
            </div>
            {/* Friend Code 확인 링크 추가 */}
            <div className="text-center mt-4">
              <Link
                href="https://maimaidx-eng.com/maimai-mobile/friend/userFriendCode/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Friend Code를 확인하는 방법
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

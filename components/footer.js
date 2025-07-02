import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              maimaiDX Custom Rating은 마이마이 플레이어들을 위한 커스텀 레이팅
              시스템을 제공합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/whatiscustomrating"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Custom Rating이란?
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Update & Help
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">External Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://x.com/CYGame_Contest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  싸이뮤직 게임 콘테스트 트위터(X) 계정
                </Link>
              </li>
              <li>
                <Link
                  href="https://maimaidx-eng.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  maimaiDX 공식 홈페이지
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/howlingsoul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  기타 서비스 관련된 문의 : 트위터(X) @howlingsoul
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 maimaiDX Custom Rating. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            This is an unofficial fan-made project. maimaiDX is a trademark of
            SEGA Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
}

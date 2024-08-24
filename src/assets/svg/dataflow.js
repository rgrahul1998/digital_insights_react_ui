import React from 'react';

const SvgDiagram = () => {
  return (
    <svg
      viewBox="0 0 1100 600" // Adjust this to fit the actual dimensions of your SVG content
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto'}} // Ensure full width and auto height to maintain aspect ratio
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1e1e1e', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#333', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="black" />
        </filter>
        <linearGradient id="blueLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#00f', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00aaff', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Top Boxes */}
      <rect x="100" y="50" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="175" y="75" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Data Import</text>

      <rect x="300" y="50" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="375" y="75" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Requests</text>

      <rect x="500" y="50" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="575" y="75" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Spreadsheets</text>

      <rect x="700" y="50" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="775" y="75" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">API</text>

      {/* Center Box */}
      <rect x="425" y="200" width="150" height="100" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="500" y="230" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Data Input</text>
      <text x="500" y="270" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Data Output</text>

      {/* Bottom Boxes */}
      <rect x="100" y="400" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="175" y="425" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">P&L</text>

      <rect x="300" y="400" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="375" y="425" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Portfolio Intelligence</text>

      <rect x="500" y="400" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="575" y="425" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Reports</text>

      <rect x="700" y="400" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="775" y="425" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Presentation</text>

      <rect x="900" y="400" width="150" height="50" fill="url(#grad1)" stroke="#333" strokeWidth="2" rx="10" ry="10" filter="url(#shadow)" />
      <text x="975" y="425" fill="white" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle" dominantBaseline="middle">Dashboard</text>

      {/* Dotted Lines */}
      <path d="M175,100 C300,150 400,150 500,200" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />
      <path d="M375,100 C450,150 450,150 500,200" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />
      <path d="M575,100 C550,150 550,150 500,200" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />
      <path d="M775,100 C700,150 600,150 500,200" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />

      <path d="M500,300 C400,350 200,350 175,400" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />
      <path d="M500,300 C450,350 350,350 375,400" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />
      <path d="M500,300 C550,350 650,350 575,400" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />
      <path d="M500,300 C600,350 700,350 775,400" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />
      <path d="M500,300 C700,350 900,350 975,400" stroke="url(#blueLineGradient)" fill="none" style={{ strokeDasharray: 4, strokeDashoffset: 0, animation: 'dash 2s linear infinite' }} />
    </svg>
  );
};

export default SvgDiagram;

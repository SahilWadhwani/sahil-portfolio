// import React, { useState, useEffect } from 'react';

// interface TerminalLine {
//   prompt: string;
//   command: string;
//   output: string;
//   delay: number;
// }

// const TerminalHero = () => {
//   const [currentLine, setCurrentLine] = useState(0);
//   const [currentChar, setCurrentChar] = useState(0);
//   const [displayText, setDisplayText] = useState('');
//   const [showCursor, setShowCursor] = useState(true);
//   const [isDecoding, setIsDecoding] = useState(false);

//   const terminalLines: TerminalLine[] = [
//     {
//       prompt: '❯',
//       command: 'whoami',
//       output: 'Sahil Wadhwani',
//       delay: 1000
//     },
//     {
//       prompt: '❯',
//       command: 'cat role.txt',
//       output: 'Software Dev | Cybersecurity | AI/ML',
//       delay: 2000
//     },
//     {
//       prompt: '❯',
//       command: 'ls skills/',
//       output: 'cybersecurity/ full-stack/ ai-ml/ devops/',
//       delay: 3000
//     }
//   ];

//   const generateRandomChars = (length: number) => {
//     const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()';
//     return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
//   };

//   const decodeText = (targetText: string, callback: () => void) => {
//     setIsDecoding(true);
//     let iterations = 0;
//     const maxIterations = 20;
    
//     const interval = setInterval(() => {
//       setDisplayText(
//         targetText
//           .split('')
//           .map((char, index) => {
//             if (index < iterations) {
//               return targetText[index];
//             }
//             return generateRandomChars(1);
//           })
//           .join('')
//       );

//       if (iterations >= targetText.length) {
//         clearInterval(interval);
//         setIsDecoding(false);
//         setTimeout(callback, 500);
//       }

//       iterations += 1 / 3;
//     }, 50);
//   };

//   useEffect(() => {
//     if (currentLine < terminalLines.length) {
//       const line = terminalLines[currentLine];
      
//       setTimeout(() => {
//         if (currentChar < line.command.length) {
//           setDisplayText(prev => prev + line.command[currentChar]);
//           setCurrentChar(prev => prev + 1);
//         } else {
//           // Command typed, now decode the output
//           setTimeout(() => {
//             setDisplayText('');
//             decodeText(line.output, () => {
//               setTimeout(() => {
//                 setCurrentLine(prev => prev + 1);
//                 setCurrentChar(0);
//                 setDisplayText('');
//               }, 1000);
//             });
//           }, 500);
//         }
//       }, 100);
//     }
//   }, [currentChar, currentLine]);

//   return (
//     <div className="terminal-container max-w-2xl mx-auto">
//       {terminalLines.slice(0, currentLine).map((line, index) => (
//         <div key={index} className="mb-4">
//           <div className="terminal-line">
//             <span className="terminal-prompt">{line.prompt}</span>
//             <span className="text-white">{line.command}</span>
//           </div>
//           <div className="terminal-line pl-4">
//             <span className="text-cyan-400">{line.output}</span>
//           </div>
//         </div>
//       ))}
      
//       {currentLine < terminalLines.length && (
//         <div className="terminal-line">
//           <span className="terminal-prompt">{terminalLines[currentLine].prompt}</span>
//           <span className="text-white">
//             {currentChar < terminalLines[currentLine].command.length 
//               ? terminalLines[currentLine].command.slice(0, currentChar)
//               : terminalLines[currentLine].command
//             }
//             {currentChar < terminalLines[currentLine].command.length && showCursor && (
//               <span className="terminal-cursor"></span>
//             )}
//           </span>
//         </div>
//       )}
      
//       {currentChar >= terminalLines[currentLine]?.command.length && displayText && (
//         <div className="terminal-line pl-4">
//           <span className={`${isDecoding ? 'text-gray-400' : 'text-cyan-400'} binary-decode`}>
//             {displayText}
//             {isDecoding && <span className="terminal-cursor"></span>}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TerminalHero;

import React, { useEffect, useState } from 'react';

const scrambleChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()';

const scrambleDecode = (text: string, callback: (decoded: string) => void) => {
  let frame = 0;
  const interval = setInterval(() => {
    const result = text
      .split('')
      .map((char, i) => (i < frame ? text[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]))
      .join('');
    callback(result);
    frame++;
    if (frame > text.length) clearInterval(interval);
  }, 50);
};

const TerminalBlock = ({ lines }: { lines: { prompt: string; command: string; output: string }[] }) => {
  const [decodedLines, setDecodedLines] = useState<string[]>(Array(lines.length).fill(''));

  useEffect(() => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        scrambleDecode(line.output, (decoded) => {
          setDecodedLines((prev) => {
            const updated = [...prev];
            updated[index] = decoded;
            return updated;
          });
        });
      }, index * 1500);
    });
  }, [lines]);

  return (
    <div className="terminal-container max-w-2xl mx-auto min-h-[220px] px-4 py-3 bg-black/60 rounded-lg border border-cyan-500 text-sm leading-relaxed flex flex-col overflow-x-auto whitespace-nowrap justify-between">
      {lines.map((line, index) => (
        <div key={index} className="mb-4">
          <div className="terminal-line">
            <span className="terminal-prompt">{line.prompt}</span>
            <span className="text-white">{line.command}</span>
          </div>
          <div className="terminal-line pl-4">
            <span className="text-cyan-400">{decodedLines[index]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const TerminalHero = () => {
  const fullLines = [
    { prompt: '❯', command: 'whoami', output: 'Sahil Wadhwani' },
    { prompt: '❯', command: 'cat role.txt', output: 'Software Development | Cybersecurity | AI/ML' },
    { prompt: '❯', command: 'ls skills/', output: 'cybersecurity/ full-stack/ ai-ml/ devops/' }
  ];

  const mobileLines = [
    { prompt: '❯', command: 'whoami', output: 'Sahil' },
    { prompt: '❯', command: 'cat role.txt', output: 'Dev | Sec | AI' },
    { prompt: '❯', command: 'ls skills/', output: 'cyber/ dev/ ml/ devops' }
  ];

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <TerminalBlock lines={fullLines} />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <TerminalBlock lines={mobileLines} />
      </div>
    </>
  );
};

export default TerminalHero;
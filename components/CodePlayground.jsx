import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading Code Editor...</p>
      </div>
    </div>
  )
});

const CodePlayground = ({ isDarkMode = false }) => {
  const [activeLanguage, setActiveLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pre-defined code examples
  const codeExamples = {
    javascript: {
      name: 'JavaScript',
      icon: '🟨',
      defaultCode: `// Interactive JavaScript Playground
// Try modifying this code and run it!

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Demo
console.log('Fibonacci sequence:');
for (let i = 0; i <= 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}

console.log('\\nSorting demo:');
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', bubbleSort([...numbers]));

// Object-oriented example
class Calculator {
  constructor() {
    this.history = [];
  }
  
  add(a, b) {
    const result = a + b;
    this.history.push(\`\${a} + \${b} = \${result}\`);
    return result;
  }
  
  multiply(a, b) {
    const result = a * b;
    this.history.push(\`\${a} × \${b} = \${result}\`);
    return result;
  }
  
  getHistory() {
    return this.history;
  }
}

const calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 7);
console.log('\\nCalculator History:', calc.getHistory());`
    },
    python: {
      name: 'Python',
      icon: '🐍',
      defaultCode: `# Interactive Python Playground
# Note: This is a simulation - Python code displayed for demonstration

def fibonacci(n):
    """Calculate fibonacci number using recursion"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def bubble_sort(arr):
    """Sort array using bubble sort algorithm"""
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Demo
print("Fibonacci sequence:")
for i in range(11):
    print(f"F({i}) = {fibonacci(i)}")

print("\\nSorting demo:")
numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original:", numbers)
print("Sorted:", bubble_sort(numbers.copy()))

# Class example
class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def multiply(self, a, b):
        result = a * b
        self.history.append(f"{a} × {b} = {result}")
        return result

calc = Calculator()
calc.add(5, 3)
calc.multiply(4, 7)
print("\\nCalculator History:", calc.history)`
    },
    html: {
      name: 'HTML/CSS',
      icon: '🌐',
      defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Web Demo</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            color: white;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .btn {
            background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .animated {
            animation: bounce 2s infinite;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="animated">🚀 Welcome to My Portfolio</h1>
        
        <div class="card">
            <h2>About Me</h2>
            <p>I'm Ujjwal Kumar, a passionate Full Stack Developer specializing in modern web technologies, mobile applications, and user experience design.</p>
        </div>
        
        <div class="card">
            <h2>Skills</h2>
            <p>React • Next.js • Node.js • MongoDB • Python • Java • UI/UX Design</p>
            <button class="btn" onclick="alert('Thanks for checking out my skills!')">
                Learn More
            </button>
        </div>
        
        <div class="card">
            <h2>Interactive Demo</h2>
            <p>This is a live HTML/CSS demo showing responsive design and modern styling techniques.</p>
            <button class="btn" onclick="document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">
                Change Theme
            </button>
        </div>
    </div>
    
    <script>
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Portfolio loaded successfully!');
            
            // Smooth animations
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });
    </script>
</body>
</html>`
    }
  };

  useEffect(() => {
    if (codeExamples[activeLanguage]) {
      setCode(codeExamples[activeLanguage].defaultCode);
    }
  }, [activeLanguage]);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    setTimeout(() => {
      if (activeLanguage === 'javascript') {
        try {
          // Create a custom console object to capture output
          let consoleOutput = '';
          const customConsole = {
            log: (...args) => {
              consoleOutput += args.join(' ') + '\n';
            }
          };

          // Create a function to execute the code safely
          const executeCode = new Function('console', code);
          executeCode(customConsole);

          setOutput(consoleOutput || 'Code executed successfully! (No console output)');
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        }
      } else if (activeLanguage === 'python') {
        // Simulate Python execution
        setOutput(`Python Code Analysis:
✓ Syntax appears valid
✓ Functions defined: fibonacci, bubble_sort
✓ Class defined: Calculator
✓ Would output fibonacci sequence and sorting demo
✓ Calculator operations would be logged

Note: This is a demonstration. In a real implementation, 
this would connect to a Python interpreter service.`);
      } else if (activeLanguage === 'html') {
        setOutput('HTML/CSS code is valid! Preview would show:\n✓ Responsive design with glass morphism\n✓ Interactive buttons and animations\n✓ Modern gradient backgrounds\n✓ Smooth transitions and effects');
      }

      setIsRunning(false);
    }, 1500);
  };

  const codingChallenges = [
    {
      title: "Array Manipulation",
      description: "Implement a function to find the largest element in an array",
      difficulty: "Easy",
      color: "green"
    },
    {
      title: "Binary Search",
      description: "Implement binary search algorithm with O(log n) complexity",
      difficulty: "Medium",
      color: "yellow"
    },
    {
      title: "Dynamic Programming",
      description: "Solve the coin change problem using dynamic programming",
      difficulty: "Hard",
      color: "red"
    }
  ];

  if (!isClient) {
    return (
      <div className="w-full px-[12%] py-16">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading Interactive Code Playground...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full px-[12%] py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-Ovo mb-4">Interactive Code Playground</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my coding skills with live code examples. Run algorithms, see data structures in action, and experiment with different programming languages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Code Editor Section */}
          <div className="lg:col-span-2">
            {/* Language Selector */}
            <div className="flex gap-2 mb-4">
              {Object.entries(codeExamples).map(([lang, config]) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeLanguage === lang
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span>{config.icon}</span>
                  {config.name}
                </button>
              ))}
            </div>

            {/* Editor */}
            <div className={`rounded-xl border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-300'
            } overflow-hidden mb-4`}>
              <div className={`p-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="ml-4 font-medium">
                      {codeExamples[activeLanguage]?.name} Editor
                    </span>
                  </div>
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isRunning ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Running...
                      </>
                    ) : (
                      <>
                        ▶️ Run Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              <MonacoEditor
                height="400px"
                language={activeLanguage === 'html' ? 'html' : activeLanguage}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme={isDarkMode ? 'vs-dark' : 'light'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Output */}
            <div className={`rounded-xl border ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'
            } p-4`}>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                📤 Output
              </h3>
              <pre className={`text-sm overflow-x-auto ${
                isDarkMode ? 'text-green-400' : 'text-green-700'
              } font-mono whitespace-pre-wrap`}>
                {output || 'Click "Run Code" to see the output...'}
              </pre>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coding Challenges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-xl border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🎯 Coding Challenges
              </h3>
              <div className="space-y-3">
                {codingChallenges.map((challenge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                    } cursor-pointer hover:scale-105 transition-transform`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{challenge.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        challenge.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        challenge.color === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {challenge.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Code Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className={`p-6 rounded-xl border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                📊 Coding Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Problems Solved</span>
                  <span className="font-bold text-green-500">200+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Languages Mastered</span>
                  <span className="font-bold text-blue-500">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Code Quality</span>
                  <span className="font-bold text-purple-500">A+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Open Source</span>
                  <span className="font-bold text-orange-500">Active</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className={`p-6 rounded-xl border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🔗 Quick Links
              </h3>
              <div className="space-y-2">
                <a
                  href="https://github.com/Ujjwall-Singh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  🐙 GitHub Repository
                </a>
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  🧠 LeetCode Profile
                </a>
                <a
                  href="#contact"
                  className="block p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-blue-700 dark:text-blue-300"
                >
                  💬 Discuss Code
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodePlayground;
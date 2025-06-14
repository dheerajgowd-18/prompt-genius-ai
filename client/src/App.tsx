import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Copy } from 'lucide-react'

const roles = [
  { value: 'expert', label: 'Expert' },
  { value: 'professional', label: 'Professional' },
  { value: 'specialist', label: 'Specialist' },
  { value: 'consultant', label: 'Consultant' },
]

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
]

const formats = [
  { value: 'structured', label: 'Structured' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'step-by-step', label: 'Step-by-Step' },
  { value: 'detailed', label: 'Detailed' },
]

const useCases = [
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'code-generation', label: 'Code Generation' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'problem-solving', label: 'Problem Solving' },
]

function App() {
  const [userPrompt, setUserPrompt] = useState('')
  const [role, setRole] = useState('')
  const [tone, setTone] = useState('')
  const [format, setFormat] = useState('')
  const [useCase, setUseCase] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!userPrompt || !role || !tone || !format || !useCase) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt,
          role,
          tone,
          outputFormat: format,
          useCase,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate prompt')
      }
      
      setEnhancedPrompt(data.improvedPrompt)
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Failed to generate prompt')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedPrompt)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">PromptGenius AI</h1>
        <p className="text-center text-muted-foreground">
          Transform your basic prompts into professional-grade AI prompts
        </p>
        <p className="text-center text-red-500">
          DEBUG Backend URL: {import.meta.env.VITE_BACKEND_URL || 'Not Set'}
        </p>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your basic prompt..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="min-h-[100px]"
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone.value} value={tone.value}>
                          {tone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Use Case</label>
                  <Select value={useCase} onValueChange={setUseCase}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select use case" />
                    </SelectTrigger>
                    <SelectContent>
                      {useCases.map((useCase) => (
                        <SelectItem key={useCase.value} value={useCase.value}>
                          {useCase.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Generating...' : 'Generate Enhanced Prompt'}
              </Button>
            </CardContent>
          </Card>

          {enhancedPrompt && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Enhanced Prompt</CardTitle>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={enhancedPrompt}
                  readOnly
                  className="min-h-[200px] bg-muted"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default App 
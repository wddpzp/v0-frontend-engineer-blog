import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function AboutPage() {
  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "JavaScript",
    "CSS",
    "HTML",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "REST APIs",
    "Git",
    "Webpack",
    "Vite",
    "Jest",
    "Cypress",
    "Figma",
    "Accessibility",
    "Performance",
  ]

  const experience = [
    {
      company: "TechCorp Inc.",
      role: "Senior Frontend Engineer",
      period: "2022 - Present",
      description:
        "Lead frontend development for a SaaS platform serving 100k+ users. Built scalable React applications with TypeScript and Next.js.",
    },
    {
      company: "StartupXYZ",
      role: "Frontend Engineer",
      period: "2020 - 2022",
      description:
        "Developed responsive web applications using React and modern CSS. Improved page load times by 40% through performance optimizations.",
    },
    {
      company: "Digital Agency",
      role: "Junior Frontend Developer",
      period: "2019 - 2020",
      description:
        "Created interactive websites for clients using HTML, CSS, and JavaScript. Collaborated with designers to implement pixel-perfect designs.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">About Me</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-6">
                I'm Alex Chen, a passionate frontend engineer with over 5 years of experience building modern web
                applications. I specialize in React, TypeScript, and Next.js, with a strong focus on performance,
                accessibility, and user experience.
              </p>
              <p className="text-muted-foreground mb-8">
                When I'm not coding, you can find me contributing to open source projects, writing technical articles,
                or exploring the latest web technologies. I believe in continuous learning and sharing knowledge with
                the developer community.
              </p>
            </div>

            <div className="flex gap-4 mb-12">
              <a
                href="mailto:alex@example.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                alex@example.com
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                Twitter
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="border-l-2 border-muted pl-4">
                      <h3 className="font-semibold">{job.role}</h3>
                      <p className="text-sm text-primary font-medium">{job.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">{job.period}</p>
                      <p className="text-sm">{job.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Send, Shield, Zap, Globe, Users, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="glass-card border-b border-border-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold gradient-text">Wiremit</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="gold">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Send Money to Your{" "}
              <span className="gradient-text">Children Abroad</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Secure, fast, and affordable money transfers from Zimbabwe to the UK and South Africa. 
              Supporting parents who care about their children's education.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="gold" size="lg" className="min-w-[200px]">
                <Send className="h-5 w-5 mr-2" />
                Start Sending Money
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="premium" size="lg" className="min-w-[200px]">
                <ArrowRight className="h-5 w-5 mr-2" />
                Access Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Wiremit?</h2>
          <p className="text-muted-foreground text-lg">
            Built specifically for Zimbabwean parents supporting their children's education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="glass-card floating-card">
            <CardHeader>
              <div className="p-2 bg-accent-gold/20 rounded-lg w-fit">
                <Shield className="h-6 w-6 text-accent-gold" />
              </div>
              <CardTitle>Bank-Level Security</CardTitle>
              <CardDescription>
                Your money and data are protected with military-grade encryption
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card floating-card">
            <CardHeader>
              <div className="p-2 bg-success/20 rounded-lg w-fit">
                <Zap className="h-6 w-6 text-success" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Most transfers complete within minutes, not days
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card floating-card">
            <CardHeader>
              <div className="p-2 bg-warning/20 rounded-lg w-fit">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <CardTitle>Best Exchange Rates</CardTitle>
              <CardDescription>
                Real-time rates with minimal markup for maximum value
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card floating-card">
            <CardHeader>
              <div className="p-2 bg-blue-500/20 rounded-lg w-fit">
                <Globe className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle>Global Reach</CardTitle>
              <CardDescription>
                Send to UK (GBP) and South Africa (ZAR) instantly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card floating-card">
            <CardHeader>
              <div className="p-2 bg-purple-500/20 rounded-lg w-fit">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle>Family-Focused</CardTitle>
              <CardDescription>
                Purpose-built for parents supporting their children's futures
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card floating-card">
            <CardHeader>
              <div className="p-2 bg-green-500/20 rounded-lg w-fit">
                <Send className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle>Low Fees</CardTitle>
              <CardDescription>
                Transparent pricing with no hidden charges
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Send Money Securely?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of parents who trust Wiremit to support their children's dreams abroad.
              Create your account in less than 5 minutes.
            </p>
            <Link to="/signup">
              <Button variant="gold" size="lg" className="min-w-[250px]">
                <Send className="h-5 w-5 mr-2" />
                Create Free Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-accent mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Wiremit. Built with care for families worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

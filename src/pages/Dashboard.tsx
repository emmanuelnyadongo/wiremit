import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  LogOut, 
  Send, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  PoundSterling,
  DollarSign,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock exchange rates API
const fetchExchangeRates = async () => {
  const response = await fetch("https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS");
  const data = await response.json();
  return data;
};

// Mock transaction data - Extended to 20 transactions
const mockTransactions = [
  { id: "1", date: "2024-01-15", amount: 500, currency: "GBP", fee: 12.50, status: "completed", recipient: "Sarah M." },
  { id: "2", date: "2024-01-12", amount: 300, currency: "ZAR", fee: 8.75, status: "completed", recipient: "James K." },
  { id: "3", date: "2024-01-10", amount: 750, currency: "GBP", fee: 18.25, status: "pending", recipient: "Emma L." },
  { id: "4", date: "2024-01-08", amount: 200, currency: "ZAR", fee: 6.50, status: "completed", recipient: "Michael T." },
  { id: "5", date: "2024-01-05", amount: 1000, currency: "GBP", fee: 25.00, status: "completed", recipient: "Sophie R." },
  { id: "6", date: "2024-01-03", amount: 450, currency: "ZAR", fee: 11.25, status: "failed", recipient: "David H." },
  { id: "7", date: "2024-01-01", amount: 600, currency: "GBP", fee: 15.50, status: "completed", recipient: "Alice W." },
  { id: "8", date: "2023-12-28", amount: 350, currency: "ZAR", fee: 9.75, status: "completed", recipient: "Robert B." },
  { id: "9", date: "2023-12-25", amount: 800, currency: "GBP", fee: 20.00, status: "completed", recipient: "Lisa C." },
  { id: "10", date: "2023-12-22", amount: 250, currency: "ZAR", fee: 7.25, status: "completed", recipient: "John D." },
  { id: "11", date: "2023-12-20", amount: 900, currency: "GBP", fee: 22.50, status: "completed", recipient: "Maria G." },
  { id: "12", date: "2023-12-18", amount: 420, currency: "ZAR", fee: 12.60, status: "completed", recipient: "Peter S." },
  { id: "13", date: "2023-12-15", amount: 650, currency: "GBP", fee: 16.25, status: "pending", recipient: "Anna K." },
  { id: "14", date: "2023-12-12", amount: 380, currency: "ZAR", fee: 11.40, status: "completed", recipient: "Tom H." },
  { id: "15", date: "2023-12-10", amount: 1200, currency: "GBP", fee: 30.00, status: "completed", recipient: "Rachel P." },
  { id: "16", date: "2023-12-08", amount: 280, currency: "ZAR", fee: 8.40, status: "failed", recipient: "Kevin M." },
  { id: "17", date: "2023-12-05", amount: 750, currency: "GBP", fee: 18.75, status: "completed", recipient: "Jennifer L." },
  { id: "18", date: "2023-12-03", amount: 320, currency: "ZAR", fee: 9.60, status: "completed", recipient: "Daniel R." },
  { id: "19", date: "2023-12-01", amount: 850, currency: "GBP", fee: 21.25, status: "completed", recipient: "Nicole T." },
  { id: "20", date: "2023-11-28", amount: 480, currency: "ZAR", fee: 14.40, status: "completed", recipient: "Christopher B." },
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [sendAmount, setSendAmount] = useState([500]);
  const [currency, setCurrency] = useState("GBP");
  const [amountInput, setAmountInput] = useState("500");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(6);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch exchange rates
  const { data: ratesData, isLoading: ratesLoading } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    const currentUser = localStorage.getItem("wiremit_currentUser");
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(currentUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("wiremit_currentUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleSliderChange = (value: number[]) => {
    setSendAmount(value);
    setAmountInput(value[0].toString());
  };

  const handleInputChange = (value: string) => {
    setAmountInput(value);
    const numValue = parseFloat(value) || 0;
    setSendAmount([numValue]);
  };

  const getExchangeRate = () => {
    if (!ratesData) return 0;
    return currency === "GBP" ? ratesData.GBP || 0.75 : ratesData.ZAR || 18.5;
  };

  const calculateFee = () => {
    const amount = sendAmount[0];
    let feeRate = 0.1; // Default to GBP
    if (currency === "ZAR") feeRate = 0.2;
    return Math.ceil(amount * feeRate).toFixed(2); // Round up
  };

  const calculateConversion = () => {
    const rate = getExchangeRate();
    const amount = sendAmount[0];
    // Deduct fee first, then convert, round up
    const fee = Math.ceil(amount * (currency === "GBP" ? 0.1 : 0.2));
    const finalAmount = Math.ceil((amount - fee) * rate);
    return finalAmount.toFixed(2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="success-badge"><CheckCircle className="w-3 h-3 mr-1" />Completed</span>;
      case "pending":
        return <span className="pending-badge"><Clock className="w-3 h-3 mr-1" />Pending</span>;
      case "failed":
        return <span className="failed-badge"><XCircle className="w-3 h-3 mr-1" />Failed</span>;
      default:
        return null;
    }
  };

  const totalSentThisMonth = mockTransactions
    .filter(t => t.status === "completed" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  // Pagination logic
  const totalPages = Math.ceil(mockTransactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = mockTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!user) {
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-card border-b border-border-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold gradient-text">Wiremit</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-accent-gold text-accent-gold-foreground text-sm">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Send Money Made Simple</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card floating-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sent This Month</p>
                    <p className="text-2xl font-bold">${totalSentThisMonth.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card floating-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent-gold/20 rounded-lg">
                    <PoundSterling className="h-5 w-5 text-accent-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GBP Rate</p>
                    <p className="text-2xl font-bold">
                      {ratesLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : `$${getExchangeRate().toFixed(3)}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card floating-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <DollarSign className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ZAR Rate</p>
                    <p className="text-2xl font-bold">
                      {ratesLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : `R${getExchangeRate().toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Send Money Section */}
          <div className="lg:col-span-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-accent-gold" />
                  Send Money
                </CardTitle>
                <CardDescription>
                  Send money to your loved ones abroad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amountInput}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="text-2xl font-bold h-12"
                    />
                  </div>

                  <div>
                    <Label>Amount Slider</Label>
                    <Slider
                      value={sendAmount}
                      onValueChange={handleSliderChange}
                      max={2000}
                      min={10}
                      step={10}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>$10</span>
                      <span>$2,000</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GBP">🇬🇧 British Pound (GBP)</SelectItem>
                        <SelectItem value="ZAR">🇿🇦 South African Rand (ZAR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exchange Rate</span>
                    <span className="font-medium">
                      1 USD = {getExchangeRate().toFixed(currency === "ZAR" ? 2 : 3)} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Fee</span>
                    <span className="font-medium">${calculateFee()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Recipient Gets</span>
                    <span className="text-accent-gold">
                      {calculateConversion()} {currency}
                    </span>
                  </div>
                </div>

                <Button variant="gold" size="lg" className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Send ${sendAmount[0]} USD
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Ads Section */}
          <div className="lg:col-span-3">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Special Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-4 bg-gradient-gold rounded-lg text-accent-gold-foreground">
                        <h3 className="font-bold mb-2">0% Fees Weekend!</h3>
                        <p className="text-sm">Send money with zero transaction fees this weekend only.</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-4 bg-gradient-success rounded-lg text-success-foreground">
                        <h3 className="font-bold mb-2">Student Discounts</h3>
                        <p className="text-sm">Special rates for education-related transfers.</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-4 bg-gradient-primary rounded-lg border border-accent-gold/30">
                        <h3 className="font-bold mb-2">Refer & Earn</h3>
                        <p className="text-sm">Get $25 for every friend you refer to Wiremit.</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-4 bg-gradient-warning rounded-lg text-warning-foreground">
                        <h3 className="font-bold mb-2">Business Accounts</h3>
                        <p className="text-sm">Bulk transfer discounts for businesses and organizations.</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-4 bg-gradient-info rounded-lg text-info-foreground">
                        <h3 className="font-bold mb-2">Mobile App</h3>
                        <p className="text-sm">Download our app for faster transfers on the go.</p>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-5">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  Your recent money transfers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {currentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{transaction.recipient}</span>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(transaction.date).toLocaleDateString()} • Fee: ${transaction.fee}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${transaction.amount}</div>
                        <div className="text-sm text-muted-foreground">{transaction.currency}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <Pagination className="justify-center">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) handlePageChange(currentPage - 1);
                        }}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) handlePageChange(currentPage + 1);
                        }}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
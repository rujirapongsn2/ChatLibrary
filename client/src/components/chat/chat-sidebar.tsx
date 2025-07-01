import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Bookmark, Star } from "lucide-react";
import type { User } from "@shared/schema";

interface ChatSidebarProps {
  currentView: 'search' | 'my-books' | 'recommendations';
  language: 'en' | 'th';
  onViewChange: (view: 'search' | 'my-books' | 'recommendations') => void;
  onLanguageChange: (language: 'en' | 'th') => void;
}

export default function ChatSidebar({ 
  currentView, 
  language, 
  onViewChange, 
  onLanguageChange 
}: ChatSidebarProps) {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user']
  });

  const { data: borrowings = [] } = useQuery({
    queryKey: ['/api/borrowings']
  });

  const labels = {
    en: {
      title: 'AI Library',
      university: 'Chulalongkorn University',
      search: 'Search Books',
      myBooks: 'My Books',
      recommendations: 'Recommendations'
    },
    th: {
      title: 'ห้องสมุดอัจฉริยะ',
      university: 'จุฬาลงกรณ์มหาวิทยาลัย',
      search: 'ค้นหาหนังสือ',
      myBooks: 'หนังสือของฉัน',
      recommendations: 'แนะนำหนังสือ'
    }
  };

  return (
    <div className="w-80 bg-off-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-muted-blue rounded-xl flex items-center justify-center">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {labels[language].title}
            </h1>
            <p className="text-sm text-gray-500">
              {labels[language].university}
            </p>
          </div>
        </div>
        
        {/* Language Toggle */}
        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
          <Button
            variant={language === 'en' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-sm"
            onClick={() => onLanguageChange('en')}
          >
            English
          </Button>
          <Button
            variant={language === 'th' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 text-sm"
            onClick={() => onLanguageChange('th')}
          >
            ไทย
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <Button
            variant={currentView === 'search' ? 'default' : 'ghost'}
            className="w-full justify-start space-x-3"
            onClick={() => onViewChange('search')}
          >
            <Search className="w-5 h-5" />
            <span>{labels[language].search}</span>
          </Button>
          
          <Button
            variant={currentView === 'my-books' ? 'default' : 'ghost'}
            className="w-full justify-start space-x-3"
            onClick={() => onViewChange('my-books')}
          >
            <Bookmark className="w-5 h-5" />
            <span>{labels[language].myBooks}</span>
            {borrowings.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {borrowings.length}
              </Badge>
            )}
          </Button>
          
          <Button
            variant={currentView === 'recommendations' ? 'default' : 'ghost'}
            className="w-full justify-start space-x-3"
            onClick={() => onViewChange('recommendations')}
          >
            <Star className="w-5 h-5" />
            <span>{labels[language].recommendations}</span>
          </Button>
        </div>
      </nav>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64" 
              alt="Student profile" 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {language === 'en' ? 'Student ID' : 'รหัสนักศึกษา'}: {user.studentId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

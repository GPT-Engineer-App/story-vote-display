import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const { data: topStoryIds } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const top5StoryIds = topStoryIds.slice(0, 5);
        const storyPromises = top5StoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const stories = await Promise.all(storyPromises);
        setStories(stories.map(story => story.data));
      } catch (error) {
        console.error('Error fetching top stories:', error);
      }
    };

    fetchTopStories();
  }, []);

  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`h-screen w-screen flex flex-col items-center justify-center ${darkMode ? 'dark' : ''}`}>
      <div className="absolute top-4 right-4">
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </div>
      <Input 
        placeholder="Search stories..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        className="mb-4 w-3/4 max-w-md"
      />
      <div className="w-3/4 max-w-md">
        {filteredStories.map(story => (
          <Card key={story.id} className="mb-4">
            <CardHeader>
              <Popover>
                <PopoverTrigger asChild>
                  <CardTitle>{story.title}</CardTitle>
                </PopoverTrigger>
                <PopoverContent>
                  <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {story.url}
                  </a>
                </PopoverContent>
              </Popover>
              <CardDescription>{story.score} upvotes</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Read more
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
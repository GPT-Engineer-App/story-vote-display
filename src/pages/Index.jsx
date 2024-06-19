import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 10;

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const { data: topStoryIds } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const top30StoryIds = topStoryIds.slice(0, 30);
        const storyPromises = top30StoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
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

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Input 
        placeholder="Search stories..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        className="mb-4 w-3/4 max-w-md"
      />
      <div className="w-full max-w-4xl">
        {currentStories.map(story => (
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          </PaginationItem>
          {[...Array(Math.ceil(filteredStories.length / storiesPerPage)).keys()].map(number => (
            <PaginationItem key={number + 1}>
              <PaginationLink onClick={() => paginate(number + 1)}>{number + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredStories.length / storiesPerPage)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Index;
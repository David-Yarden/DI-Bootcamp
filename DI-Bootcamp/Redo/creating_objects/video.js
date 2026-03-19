class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

// Two manual instances
const video1 = new Video('JavaScript Tutorial', 'Alice', 300);
video1.watch();

const video2 = new Video('CSS Grid Crash Course', 'Bob', 450);
video2.watch();

// Bonus: array of data objects for 5 videos
const videosData = [
  { title: 'React for Beginners',     uploader: 'Charlie', time: 600  },
  { title: 'Node.js Full Course',     uploader: 'Diana',   time: 3600 },
  { title: 'Python in 100 Seconds',   uploader: 'Eve',     time: 100  },
  { title: 'TypeScript Deep Dive',    uploader: 'Frank',   time: 900  },
  { title: 'SQL Basics',              uploader: 'Grace',   time: 720  },
];

// Bonus: loop to instantiate and call watch()
videosData.forEach(({ title, uploader, time }) => {
  const video = new Video(title, uploader, time);
  video.watch();
});

const trackMapToTrack = (trackMap) => {
    return Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null)
  }
  
  export { trackMapToTrack }
  
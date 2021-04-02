function stories_to_lookup_table(stories)
{
  let lookup = {};
  stories.forEach((story, i) => {
    if (typeof lookup[story.id] === 'undefined')
    {
      lookup[story.id] = i;
    }
    else
    {
      console.error(`StoryIDError: found multiple stories with the same story id: "${story.id}".`);
    }
  });

  return lookup;
}

function story_from_id(id, story_lookup, stories)
{
  let story_index = story_lookup[id];
  return stories[story_index];
}

function dfs(stories, story_lookup, path, paths)
{
  let start_id = path[path.length - 1];
  let story = story_from_id(start_id, story_lookup, stories);

  if (typeof story === 'undefined')
  {
    console.log(story_lookup);
    return;
  }

  let neighbors = story.transitions.prev.map(x => x.id)
    .concat(story.transitions.next.map(x => x.id));

  if (neighbors.length > 0)
  {
    neighbors.forEach(neighbor => {
      if (path.indexOf(neighbor) == -1)
      {
        let new_path = path.concat([neighbor]);
        paths = dfs(stories, story_lookup, new_path, paths);
      }
      else
      {
        console.error('[paths.js] cycle detected. aborting.')
        return paths;
      }
    });
  }
  else
  {
    paths = paths.concat([path]);
  }

  return paths;
}

module.exports = (stories, initial) => {
  let story_lookup = stories_to_lookup_table(stories);
  return dfs(stories, story_lookup, [initial], [])
}

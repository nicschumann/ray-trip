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


function make_story_transition(history, id, candidates)
{
	let always = candidates.filter(s => {
		return typeof s.seen == 'undefined' && typeof s.missed == 'undefined';
	});

	let conditional = candidates.filter(s => {
		if (typeof s.seen == 'undefined' && typeof s.missed == 'undefined')
		{
			return false;
		}

		let passes = true;

		if (typeof s.seen !== 'undefined' )
		{
			passes = s.seen.reduce((acc, id) => {
					return acc && history.indexOf(id) !== -1;
			}, true);
		}

		if (typeof s.missed !== 'undefined')
		{

			passes = passes && s.missed.reduce((acc, id) => {
				return acc && history.indexOf(id) === -1
			}, true);

		}

		return passes;
	})

	if (conditional.length > 0)
	{
		return conditional
	}
	else
	{
		return always
	}
}



function dfs(stories, story_lookup, target, path, paths)
{
  let start_id = path[path.length - 1];
  let story = story_from_id(start_id, story_lookup, stories);

  if (typeof story === 'undefined')
  {
    console.log(`Undefined ID: ${start_id}`);
    return [];
  }

  let neighbors_prime = story.transitions.next.concat(story.transitions.prev);


	let candidates = (story.id == target) ? [] : make_story_transition(path, start_id, neighbors_prime);

  // let neighbors = story.transitions.prev.map(x => x.id)
  //   .concat(story.transitions.next.map(x => x.id));

	let neighbors = candidates.map(x => x.id);

  if (neighbors.length > 0)
  {
    neighbors.forEach(neighbor => {
      if (path.indexOf(neighbor) == -1)
      {
        let new_path = path.concat([neighbor]);
        paths = dfs(stories, story_lookup, target, new_path, paths);
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

module.exports = (stories, initial, final) => {
  let story_lookup = stories_to_lookup_table(stories);
  return dfs(stories, story_lookup, final, [initial], [])
}

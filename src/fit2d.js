export function fit2d_binsearch(element)
{
  let ph = element.parentNode.clientHeight - 32; // margin hardcoded
  let h = element.clientHeight;


  let iterations = 0;
  let min_size = 12;
  let max_size = 100;
  let leading = 1.1;
  let error = 20;
  let last_size;
  let last_height;

  while (min_size <= max_size  && iterations < 50)
  {
    let mid_size = Math.floor((min_size + max_size) / 2);

    element.style.fontSize = `${mid_size}px`;
    element.style.lineHeight = `${leading}em`;
    last_size = mid_size;
    last_height = h;
    h = element.clientHeight;

    // console.log('iteration', iterations);
    // console.log('last height\n', last_height);
    // console.log('height\n', h);
    //
    // console.log('min', min_size);
    // console.log('last', last_size);
    // console.log('mid', mid_size);
    // console.log('max\n\n', max_size);

    if (h < ph)
    {
      // console.log('too small, increase...')
      min_size = mid_size + 1;
    }
    else
    {
      // console.log('too big, decrease...')
      max_size = mid_size - 1;
    }
    // debugger;
    iterations++;
  }
}

export function fit2d_linear(element, percentage_of_container)
{
  let ph = element.parentNode.clientHeight - 32;
  let h = element.clientHeight;
  let iterations = 0;
  let delta = 2;
  let error = 20 * percentage_of_container;
  let seen = {}

  let size = 60;
  let leading = 1.1;

  while ((ph - h <= 0 || ph - h >= error) && iterations <= 20)
  {
    h = element.clientHeight;
    if (seen[h] && delta < 0.125) { break; }
    if (seen[h] && delta > 0.125) { delta *= 0.5; }

    seen[h] = true;

    let dir = Math.sign((ph - h) - error);
    size += dir * delta;

    element.style.fontSize = `${size}px`;
    element.style.lineHeight = `${leading}em`;

    iterations += 1;
  }
}

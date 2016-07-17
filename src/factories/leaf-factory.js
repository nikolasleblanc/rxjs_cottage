import Leaf from '../classes/leaf';

export function create(
  appLife$,
  elementAgeCounter$,
  id
) {
  const leaf = new Leaf({
    id: id,
  });
  leaf.subscribeTo(appLife$);
  leaf.subscribeTo(elementAgeCounter$);
  return leaf;
}

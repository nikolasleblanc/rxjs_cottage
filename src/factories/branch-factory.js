import Branch from '../classes/branch';

export function create(
  appLife$,
  elementAgeCounter$,
  leafMaker$,
  id
) {
  const branch = new Branch({
    id: id,
  });
  branch.subscribeTo(appLife$);
  branch.subscribeTo(elementAgeCounter$);
  branch.subscribeTo(leafMaker$);
  return branch;
}

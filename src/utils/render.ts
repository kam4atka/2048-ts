enum RenderPosition {
  Beforebigin = 'beforebegin',
  Afterbegin = 'afterbegin',
  Beforeend = 'beforeend',
  Afterend = 'afterend'
}

export function render(
  component: HTMLElement,
  container: HTMLElement,
  place?: InsertPosition
) {
  if (container === null) {
    throw new Error('Container element doesn\'t exist');
  }

  const currentPlace = (place) ? place : RenderPosition.Beforeend;

  container.insertAdjacentElement(currentPlace, component);
}

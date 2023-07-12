import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import NotFound from '.';

describe('NotFound', () => {
  it('should to be defined', () => {
    expect(NotFound).toBeDefined();
  });

  it('should render', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText('My custom not found page')).toBeInTheDocument();
  });
});

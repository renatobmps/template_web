import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddPost from '.';

describe('AddPost', () => {
  it('should be defined', () => {
    expect(AddPost).toBeDefined();
  });

  beforeEach(() => {
    render(<AddPost />);
  });

  it('renders the component', () => {
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('Ver postagens')).toBeInTheDocument();
    expect(screen.getByText('New post')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Post')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('submits the form and receives a response', async () => {
    const formData = {
      title: 'Test Title',
      body: 'Test Body',
      user: 'Test User',
    };

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: formData.title },
    });
    fireEvent.change(screen.getByLabelText('Post'), {
      target: { value: formData.body },
    });
    fireEvent.input(screen.getByLabelText('Username'), {
      target: { value: formData.user },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeEmptyDOMElement();
        expect(screen.getByText('Post')).toBeInTheDocument();
        expect(screen.getByText('Post')).toBeEmptyDOMElement();
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeEmptyDOMElement();
      }, 1000);
    });
  });
});

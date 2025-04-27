import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FooterLink } from './FooterLink';

describe('FooterLink', () => {
  const defaultProps = {
    href: 'https://example.com',
    iconSrc: '/test-icon.svg',
    iconAlt: 'Test Icon',
    children: 'Test Link',
  };

  it('renders with all required props', () => {
    render(<FooterLink {...defaultProps} />);

    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the icon with correct attributes', () => {
    render(<FooterLink {...defaultProps} />);

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveAttribute('src');
    expect(icon).toHaveAttribute('alt', 'Test Icon');
    expect(icon).toHaveAttribute('width', '16');
    expect(icon).toHaveAttribute('height', '16');
  });

  it('applies correct styling classes', () => {
    render(<FooterLink {...defaultProps} />);

    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'hover:underline',
      'hover:underline-offset-4'
    );
  });

  it('renders children content', () => {
    const testContent = 'Custom Link Text';
    render(<FooterLink {...defaultProps}>{testContent}</FooterLink>);

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import Home from '../app/page';

// mock next/navigation useRouter
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Home', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      useRouter() {
        return {
          route: '/',
          pathname: '/play',
          query: '',
          asPath: '',
          push: jest.fn(),
        };
      },
    }));
    render(<Home />);
  });

  it('renders wihout crashing', () => {
    const heading = screen.getByRole('heading', {
      name: /Play Sudoku anywhere/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('buttons in the home page', async () => {
    const buttons = await screen.findAllByRole('button');
    expect(buttons[0].innerHTML).toBe('Easy');
    expect(buttons[1].innerHTML).toBe('Medium');
    expect(buttons[2].innerHTML).toBe('Hard');
    expect(buttons[3].innerHTML).toBe('Random');
  });
});

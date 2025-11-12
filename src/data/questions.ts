import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'fundamentals',
    title: 'React Fundamentals',
    icon: '🚀',
    description: 'Core React concepts and principles',
    questions: [
      {
        id: 'virtual-dom',
        question: 'What is React\'s Virtual DOM, and how does it improve rendering performance?',
        answer: `React's Virtual DOM is an in-memory representation of the real DOM. It's a JavaScript object that describes what the UI should look like. When state changes occur, React creates a new virtual DOM tree and compares it with the previous one through a process called reconciliation.

        **Performance benefits:**
        • **Batching:** Multiple DOM updates are batched together
        • **Diffing:** Only changed elements are updated in the real DOM
        • **Efficient updates:** Minimizes expensive DOM manipulation operations
        • **Predictable performance:** Provides consistent rendering performance patterns`,
        category: 'fundamentals',
        difficulty: 'medium',
        tags: ['virtual-dom', 'performance', 'reconciliation'],
        codeExample: `// Virtual DOM representation
        const virtualElement = {
          type: 'div',
          props: {
            className: 'container',
            children: [
              {
                type: 'h1',
                props: { children: 'Hello World' }
              }
            ]
          }
        };

        // React's reconciliation process
        function reconcile(oldVNode, newVNode) {
          // Compare and update only differences
          if (oldVNode.type !== newVNode.type) {
            // Replace entire node
            replaceNode(oldVNode, newVNode);
          } else {
            // Update props and children
            updateNode(oldVNode, newVNode);
          }
}`,
        followUpQuestions: [
          'How does React Fiber improve upon the traditional reconciliation?',
          'What are the limitations of Virtual DOM?',
          'How would you optimize Virtual DOM performance?'
        ],
        estimatedTime: 8,
        interviewType: 'technical',
        companies: ['Facebook', 'Netflix', 'Airbnb', 'Uber']
      },
      {
        id: 'hooks',
        question: 'What are React Hooks, and how have they changed the way we build components?',
        answer: `React Hooks are functions that let you use state and other React features in functional components. Key hooks include useState, useEffect, useContext, and useCallback.

**How they changed React development:**
• **Eliminated class components:** No need for class syntax and binding methods
• **Simplified lifecycle:** useEffect replaces componentDidMount, componentDidUpdate, etc.
• **Better code reuse:** Custom hooks enable logic sharing between components
• **Smaller bundle size:** Functional components are more tree-shakable
        • **Improved readability:** Related logic can be grouped together`,
        category: 'fundamentals',
        difficulty: 'easy',
        tags: ['hooks', 'functional-components', 'useState', 'useEffect'],
        codeExample: `// Before Hooks (Class Component)
        class Counter extends React.Component {
          constructor(props) {
            super(props);
            this.state = { count: 0 };
            this.handleClick = this.handleClick.bind(this);
          }
          
          handleClick() {
            this.setState({ count: this.state.count + 1 });
          }
          
          render() {
            return <button onClick={this.handleClick}>{this.state.count}</button>;
          }
        }

        // After Hooks (Functional Component)
        const Counter = () => {
          const [count, setCount] = useState(0);
          return <button onClick={() => setCount(count + 1)}>{count}</button>;
        };`,
        followUpQuestions: [
          'What are the rules of hooks?',
          'How do you create custom hooks?',
          'What happens if you break the rules of hooks?'
        ],
        estimatedTime: 5,
        interviewType: 'technical',
        companies: ['Google', 'Microsoft', 'Amazon']
      },
      {
        id: 'jsx-typescript',
        question: 'How do you use JSX and TypeScript in React development? What advantages do they offer?',
        answer: `**JSX:** JSX allows you to write HTML-like code within JavaScript, making component templates more readable and intuitive.
        **TypeScript advantages:**
        • **Type safety:** Catches errors at compile time
        • **Better IntelliSense:** Enhanced IDE support with autocomplete
        • **Self-documenting code:** Types serve as inline documentation
        • **Refactoring confidence:** Safer large-scale code changes
        • **Props validation:** Interface definitions prevent prop-related bugs

        Example:
        \`\`\`typescript
        interface Props {
          name: string;
          age: number;
          onClick: () => void;
        }

        const UserCard: React.FC<Props> = ({ name, age, onClick }) => (
          <div onClick={onClick}>
            <h3>{name}</h3>
            <p>Age: {age}</p>
          </div>
        );
        \`\`\``,
                category: 'fundamentals',
                difficulty: 'easy',
                tags: ['jsx', 'typescript', 'props', 'interfaces']
      },
      {
        id: 'component-structure',
        question: 'What strategies do you use to structure React components for reuse and maintainability?',
        answer: `**Component Architecture Strategies:**

        **1. Atomic Design Principles:**
        • Atoms: Basic UI elements (Button, Input)
        • Molecules: Simple combinations (SearchBox)
        • Organisms: Complex combinations (Header, ProductList)

        **2. Composition over Inheritance:**
        • Use children props for flexible layouts
        • Higher-Order Components (HOCs) for cross-cutting concerns
        • Render props pattern for dynamic behavior

        **3. Avoid Prop Drilling:**
        • Use Context API for theme/user data
        • State management libraries (Redux) for complex state
        • Component composition to reduce nesting`,
                category: 'fundamentals',
                difficulty: 'medium',
                tags: ['architecture', 'atomic-design', 'composition', 'maintainability']
      }
    ]
  },
  {
    id: 'state-management',
    title: 'State Management',
    icon: '🔄',
    description: 'Managing application state and data flow',
    questions: [
      {
        id: 'redux',
        question: 'What is Redux and how does it help manage application state in React?',
        answer: `**Redux** is a predictable state container that implements unidirectional data flow with three core principles:

        **Core Concepts:**
        • **Single Source of Truth:** One global store for application state
        • **State is Read-Only:** Only actions can change state
        • **Pure Functions:** Reducers are pure functions that specify state changes

        **Redux Flow:**
        1. **Action:** Describes what happened
        2. **Reducer:** Specifies how state changes
        3. **Store:** Holds the application state
        4. **View:** React components subscribe to store updates

        **Benefits:** Predictable state updates, time-travel debugging, easier testing, and better organization for complex applications.`,
        category: 'state-management',
        difficulty: 'medium',
        tags: ['redux', 'state', 'actions', 'reducers', 'store']
      },
      {
        id: 'context-vs-redux',
        question: 'When would you choose React Context API over Redux?',
        answer: `**Use Context API when:**
• **Simple state:** Theming, user authentication, locale
• **Infrequent updates:** Data doesn't change often
• **Small to medium apps:** Limited complexity
• **Avoiding prop drilling:** Passing data through few levels

**Use Redux when:**
• **Complex state:** Deeply nested or interrelated data
• **Frequent updates:** Many state changes across components
• **Time-travel debugging:** Need to replay actions
• **Middleware needs:** Async actions, logging, persistence

**Performance Consideration:** Context can cause unnecessary re-renders if not optimized with React.memo and careful provider placement.`,
        category: 'state-management',
        difficulty: 'medium',
        tags: ['context', 'redux', 'performance', 'state-management']
      },
      {
        id: 'side-effects',
        question: 'How do you handle side effects like API calls or subscriptions in React?',
        answer: `**Using useEffect Hook:**

\`\`\`javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
  };
  
  fetchData();
  
  return () => {
    // Cancel requests, clear timers, etc.
  };
}, []); // Dependencies array
\`\`\`

**Best Practices:**
• **Dependency array:** Control when effects run
• **Cleanup functions:** Prevent memory leaks
• **Custom hooks:** Encapsulate reusable side effect logic
• **AbortController:** Cancel pending requests on unmount`,
        category: 'state-management',
        difficulty: 'medium',
        tags: ['useEffect', 'side-effects', 'api-calls', 'cleanup']
      },
      {
        id: 'prop-drilling',
        question: 'What is prop drilling and how can you avoid it in a large component tree?',
        answer: `**Prop Drilling** is passing props through intermediate components that don't use the data, just to reach deeply nested components.

**Problems:**
• Reduces code maintainability
• Makes components tightly coupled
• Increases complexity of intermediate components

**Solutions:**
1. **Context API:** Provide data at top level, consume where needed
2. **Redux:** Global state management
3. **Component Composition:** Use children props and layout components
4. **State Colocation:** Move state closer to where it's used
5. **Custom Hooks:** Share stateful logic across components`,
        category: 'state-management',
        difficulty: 'easy',
        tags: ['prop-drilling', 'context', 'composition', 'state-colocation']
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    icon: '⚡',
    description: 'Techniques for optimizing React applications',
    questions: [
      {
        id: 'code-splitting',
        question: 'What is code splitting, and how would you implement it in a React app?',
        answer: `**Code Splitting** is the practice of splitting your bundle into smaller chunks that can be loaded on demand, reducing initial load time.

**Implementation with React.lazy and Suspense:**
\`\`\`javascript
// Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
\`\`\`

**Other Techniques:**
• **Route-based splitting:** Load components per route
• **Dynamic imports:** Load modules conditionally
• **Bundle analyzers:** Identify large dependencies
• **Webpack optimization:** Configure chunks and splitting rules`,
        category: 'performance',
        difficulty: 'medium',
        tags: ['code-splitting', 'lazy-loading', 'suspense', 'webpack']
      },
      {
        id: 'memoization',
        question: 'How do you prevent unnecessary re-renders in React? Explain React.memo, useMemo, and useCallback.',
        answer: `**React.memo:** Higher-order component that memoizes functional components
\`\`\`javascript
const MemoizedComponent = React.memo(({ name, onClick }) => (
  <div onClick={onClick}>{name}</div>
));
\`\`\`

**useMemo:** Memoizes expensive calculations
\`\`\`javascript
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);
\`\`\`

**useCallback:** Memoizes functions to prevent child re-renders
\`\`\`javascript
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

**When to use:**
• React.memo: Components that receive stable props
• useMemo: Expensive computations with stable dependencies
• useCallback: Functions passed to memoized child components`,
        category: 'performance',
        difficulty: 'medium',
        tags: ['memoization', 'react-memo', 'useMemo', 'useCallback', 're-renders']
      },
      {
        id: 'optimization-techniques',
        question: 'Describe other techniques you use to optimize React app performance.',
        answer: `**Performance Optimization Techniques:**

**Rendering Optimizations:**
• **Proper key usage:** Stable, unique keys for list items
• **Immutable updates:** Avoid mutating state directly
• **Virtualization:** React Window for large lists
• **Debouncing:** Limit expensive operations frequency

**Loading Optimizations:**
• **Image lazy loading:** Load images as they enter viewport
• **Bundle optimization:** Tree shaking, minification
• **CDN usage:** Serve static assets from CDN
• **Preloading:** Critical resources loaded early

**Monitoring Tools:**
• Chrome DevTools Performance tab
• React Developer Tools Profiler
• Lighthouse audits
• Bundle analyzers`,
        category: 'performance',
        difficulty: 'hard',
        tags: ['optimization', 'virtualization', 'lazy-loading', 'monitoring']
      },
      {
        id: 'suspense',
        question: 'Have you used React Suspense? How does it help with performance?',
        answer: `**React Suspense** allows components to "suspend" rendering while waiting for asynchronous operations to complete.

**Performance Benefits:**
• **Better UX:** Shows loading states instead of blank screens
• **Concurrent rendering:** Non-blocking UI updates
• **Resource management:** Coordinates multiple async operations
• **Error boundaries:** Graceful error handling integration

**Usage with React.lazy:**
\`\`\`javascript
<Suspense fallback={<LoadingSpinner />}>
  <LazyLoadedComponent />
</Suspense>
\`\`\`

**Future capabilities:** Data fetching with concurrent features, automatic loading state management.`,
        category: 'performance',
        difficulty: 'hard',
        tags: ['suspense', 'concurrent-rendering', 'loading-states', 'async']
      }
    ]
  },
  {
    id: 'testing',
    title: 'Testing & Quality',
    icon: '🧪',
    description: 'Testing strategies and quality assurance',
    questions: [
      {
        id: 'testing-approach',
        question: 'What is your approach to testing React applications? Which tools do you use?',
        answer: `**Testing Strategy Pyramid:**

**1. Unit Tests (70%):**
• **Tools:** Jest + React Testing Library
• **Focus:** Individual component logic, pure functions
• **Benefits:** Fast, isolated, easy to debug

**2. Integration Tests (20%):**
• **Tools:** Jest + React Testing Library + MSW
• **Focus:** Component interactions, API integration
• **Benefits:** Test realistic user scenarios

**3. End-to-End Tests (10%):**
• **Tools:** Cypress, Playwright, or Selenium
• **Focus:** Complete user journeys
• **Benefits:** Test entire application flow

**Additional Testing Types:**
• **Visual regression:** Percy, Chromatic
• **Performance:** Lighthouse CI
• **Accessibility:** jest-axe, Pa11y`,
        category: 'testing',
        difficulty: 'medium',
        tags: ['testing-pyramid', 'jest', 'react-testing-library', 'e2e']
      },
      {
        id: 'component-testing',
        question: 'How do you test a React component?',
        answer: `**React Testing Library Approach:**

\`\`\`javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  const mockProps = {
    user: { id: 1, name: 'John Doe', email: 'john@example.com' },
    onEdit: jest.fn()
  };

  test('renders user information correctly', () => {
    render(<UserProfile {...mockProps} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserProfile {...mockProps} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);
    
    expect(mockProps.onEdit).toHaveBeenCalledWith(mockProps.user.id);
  });
});
\`\`\`

**Testing Best Practices:**
• **Test behavior, not implementation:** Focus on user interactions
• **Use semantic queries:** getByRole, getByLabelText
• **Mock external dependencies:** APIs, third-party libraries
• **Test accessibility:** Screen reader compatibility
• **Avoid testing internal state:** Test observable behavior`,
        category: 'testing',
        difficulty: 'medium',
        tags: ['component-testing', 'user-events', 'mocking', 'accessibility']
      },
      {
        id: 'code-quality',
        question: 'How do you ensure code quality and reliability over time?',
        answer: `**Automated Quality Assurance:**

**1. Continuous Integration:**
• **Automated testing:** Run tests on every commit
• **Build verification:** Ensure code compiles successfully
• **Quality gates:** Block merges if quality standards aren't met

**2. Code Quality Tools:**
• **ESLint:** Code style and bug detection
• **Prettier:** Consistent code formatting
• **TypeScript:** Static type checking
• **SonarQube:** Code quality metrics and security

**3. Development Practices:**
• **Code reviews:** Peer review all changes
• **Test coverage:** Maintain high coverage metrics
• **Documentation:** Keep README and API docs updated
• **Monitoring:** Error tracking (Sentry), performance monitoring

**4. Pipeline Configuration:**
\`\`\`yaml
# GitHub Actions example
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
\`\`\``,
        category: 'testing',
        difficulty: 'hard',
        tags: ['ci-cd', 'code-quality', 'automation', 'monitoring']
      }
    ]
  }
];








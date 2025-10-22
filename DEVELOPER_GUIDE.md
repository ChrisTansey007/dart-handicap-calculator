# Developer Quick Reference Guide

## 🚀 Getting Started

### First Time Setup
```bash
npm install
npm start
```

### Daily Development
```bash
npm start          # Start dev server
npm run build      # Production build
npm test           # Run tests (when added)
```

---

## 📁 Where to Find Things

### Need to modify a calculation formula?
→ `src/services/handicap/`

### Need to change UI styling?
→ `src/components/`

### Need to add a new constant?
→ `src/constants/`

### Need to modify state logic?
→ `src/state/`

### Need to add a utility function?
→ `src/utils/`

---

## 🔧 Common Tasks

### Add a New Component
```javascript
// 1. Create file: src/components/myFeature/MyComponent/MyComponent.jsx
import React from 'react';

export const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div>{/* Your JSX */}</div>
  );
};

// 2. Export from: src/components/myFeature/index.js
export { MyComponent } from './MyComponent/MyComponent';

// 3. Use anywhere:
import { MyComponent } from './components/myFeature';
```

### Add a New Service Function
```javascript
// 1. Create in: src/services/myService/myFunction.js
export const myFunction = (param1, param2) => {
  // Pure function logic
  return result;
};

// 2. Export from: src/services/myService/index.js
export * from './myFunction';

// 3. Use anywhere:
import { myFunction } from './services/myService';
```

### Add a New Constant
```javascript
// 1. Add to: src/constants/myConstants.js
export const MY_CONSTANT = {
  VALUE1: 'value1',
  VALUE2: 'value2',
};

// 2. Export from: src/constants/index.js
export * from './myConstants';

// 3. Use anywhere:
import { MY_CONSTANT } from './constants';
```

### Add State Action
```javascript
// 1. Define in: src/state/actions/myActions.js
export const MY_ACTION_TYPES = {
  DO_SOMETHING: 'DO_SOMETHING',
};

export const doSomething = (payload) => ({
  type: MY_ACTION_TYPES.DO_SOMETHING,
  payload,
});

// 2. Handle in: src/state/reducers/appReducer.js
case MY_ACTION_TYPES.DO_SOMETHING:
  return { ...state, field: action.payload };

// 3. Use in component:
import { doSomething } from './state';
dispatch(doSomething(data));
```

---

## 📦 Import Patterns

### ✅ Good Imports
```javascript
// Use barrel exports (index.js)
import { Button, Input } from './components/common';
import { calculateHandicap } from './services/handicap';
import { TABS, HANDICAP_METHODS } from './constants';
```

### ❌ Bad Imports
```javascript
// Don't import from deep paths
import { Button } from './components/common/Button/Button';
import { calculateMPRHandicap } from './services/handicap/mprCalculator';
```

---

## 🧪 Testing (When Implemented)

### Test a Service
```javascript
// services/handicap/__tests__/mprCalculator.test.js
import { calculateMPRHandicap } from '../mprCalculator';

describe('MPR Calculator', () => {
  it('calculates correct handicap', () => {
    const p1 = { name: 'Alice', mpr: '4.0' };
    const p2 = { name: 'Bob', mpr: '2.0' };
    const result = calculateMPRHandicap(p1, p2);
    expect(result.amount).toBe(7);
  });
});
```

### Test a Component
```javascript
// components/common/Button/__tests__/Button.test.jsx
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click</Button>
    );
    fireEvent.click(getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## 🎨 Styling Guide

### Using Tailwind Classes
```javascript
// All Tailwind classes are available
<div className="bg-stone-900 text-amber-400 p-4 rounded-lg">
  Content
</div>
```

### Custom Colors Available
- `amber-{400,500,600,700,800,900}`
- `stone-{200,300,400,500,600,700,800,900}`
- `zinc-900`

### Responsive Design
```javascript
<div className="p-4 sm:p-6 lg:p-8">
  {/* Responsive padding */}
</div>
```

---

## 🔍 Debugging Tips

### Check Component State
```javascript
const { state } = useAppContext();
console.log('Current state:', state);
```

### Test Service Function
```javascript
import { calculateHandicap } from './services/handicap';
const result = calculateHandicap(p1, p2, 'mpr');
console.log('Result:', result);
```

### Verify Props
```javascript
export const MyComponent = (props) => {
  console.log('Props received:', props);
  return <div>...</div>;
};
```

---

## 📋 Code Style Guidelines

### Component Structure
```javascript
import React from 'react';
// Other imports

/**
 * Component description
 */
export const MyComponent = ({ prop1, prop2 }) => {
  // Hooks at top
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {
    // logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### Service Function Structure
```javascript
/**
 * Function description
 * @param {Object} param1 - Description
 * @param {Object} param2 - Description
 * @returns {Object} - Description
 */
export const myServiceFunction = (param1, param2) => {
  // Pure function logic only
  // No side effects
  // No DOM manipulation
  return result;
};
```

---

## 🚨 Common Pitfalls

### ❌ Don't Mix Concerns
```javascript
// BAD - Service with UI
export const calculate = () => {
  const result = doMath();
  alert(result); // NO! Service shouldn't have UI
  return result;
};

// GOOD - Pure service
export const calculate = () => {
  return doMath();
};
```

### ❌ Don't Import Upward
```javascript
// BAD - Service importing component
import { Button } from '../../components/common';

// GOOD - Component importing service
import { calculateHandicap } from '../../services/handicap';
```

### ❌ Don't Skip Index Exports
```javascript
// BAD - Direct import
import { Button } from './components/common/Button/Button';

// GOOD - Use index
import { Button } from './components/common';
```

---

## 📚 File Naming Conventions

### Components
- PascalCase: `MyComponent.jsx`
- Folder: `MyComponent/`
- Export: `export const MyComponent`

### Services
- camelCase: `myService.js`
- Export: `export const myFunction`

### Constants
- UPPER_SNAKE_CASE: `export const MY_CONSTANT`
- File: camelCase `myConstants.js`

### Utils
- camelCase: `myUtil.js`
- Export: `export const myUtilFunction`

---

## 🔄 State Management Flow

```
1. User Action (UI)
   ↓
2. Handler Function
   ↓
3. Dispatch Action
   ↓
4. Reducer Updates State
   ↓
5. Context Provides New State
   ↓
6. Components Re-render
```

### Example
```javascript
// 1. User clicks button
<Button onClick={handleSave}>Save</Button>

// 2. Handler
const handleSave = () => {
  // 3. Dispatch action
  dispatch(savePlayer(playerData));
};

// 4. Reducer
case 'SAVE_PLAYER':
  return { ...state, roster: [...state.roster, action.payload] };

// 5. Context provides
<AppContext.Provider value={{ state, dispatch }}>

// 6. Components re-render with new state
const { state } = useAppContext();
```

---

## 🎯 Performance Tips

### Use React.memo for Pure Components
```javascript
export const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

### Memoize Expensive Calculations
```javascript
const expensiveValue = useMemo(() => {
  return calculateSomethingHeavy(data);
}, [data]);
```

### Use Callbacks for Handlers
```javascript
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

---

## 🐛 Troubleshooting

### Component Not Rendering?
1. Check imports
2. Verify export syntax
3. Check prop names
4. Inspect React DevTools

### Styles Not Working?
1. Verify Tailwind classes
2. Check tailwind.config.js
3. Restart dev server
4. Clear browser cache

### State Not Updating?
1. Check action type spelling
2. Verify reducer handles action
3. Check dispatch is called
4. Use React DevTools

### Import Error?
1. Check file path
2. Verify export syntax
3. Check index.js exports
4. Restart dev server

---

## 📞 Need Help?

### Documentation Files
- `README.md` - Project overview
- `PROJECT_STRUCTURE.md` - File organization
- `RESTRUCTURE_SUMMARY.md` - What changed
- `REVIEW_REPORT.md` - Quality review
- `FINAL_IMPLEMENTATION_SUMMARY.md` - Complete summary
- `DEVELOPER_GUIDE.md` - This file

### Code Comments
- All files have JSDoc comments
- Functions explain parameters
- Complex logic is commented

---

**Happy Coding! 🚀**

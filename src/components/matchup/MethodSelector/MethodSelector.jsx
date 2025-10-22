import React from 'react';
import { METHOD_CONFIG } from '../../../constants';
import { Button } from '../../common/Button/Button';

/**
 * Method selector component
 */
export const MethodSelector = ({ selectedMethod, onMethodChange }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-stone-200 mb-4 text-center">
        Calculation Method
      </h3>
      <div className="flex justify-center gap-4 flex-wrap">
        {Object.values(METHOD_CONFIG).map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <Button
              key={method.id}
              variant={isSelected ? 'primary' : 'secondary'}
              onClick={() => onMethodChange(method.id)}
              className={isSelected ? 'shadow-lg shadow-amber-900/40' : ''}
            >
              {method.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

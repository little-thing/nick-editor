import { useCallback, useState } from 'react';


import { PickerColorBox } from '@/constants/PickerColorBox.constant';
import classNames from 'classnames';
import { Toolbar } from '@/components/ui/Toolbar';

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
  onDefault?: () => void;
};

export const  ColorPicker = ({ color, onChange, onClear, onDefault }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color || '');

  const handleColorUpdate = useCallback((event: string) => {
    setColorInputValue(event);
    if (onChange) {
      onChange(event);
    }
  }, []);

  // const handleColorChange = useCallback(() => {
  //   const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

  //   if (!isCorrectColor) {
  //     if (onChange) {
  //       onChange('');
  //     }

  //     return;
  //   }

  //   if (onChange) {
  //     onChange(colorInputValue);
  //   }
  // }, [colorInputValue, onChange]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <span className="text-xs text-[#bfbfbf]">主题颜色</span>
      <div className="flex flex-col">
        {PickerColorBox.mainColor.map((colorLine, index) => (
          <div className="flex" style={{ marginBottom: index === 0 ? '2px' : '0' }}>
            {colorLine.map((c, subIndex) => (
              <div
                className={classNames(
                  'w-[20px] h-[20px] flex justify-center items-center hover:bg-[#f2f2f2]',
                  c === colorInputValue && 'bg-[#cfcdce]'
                )}
              >
                <div
                  key={`mc-${index}-${subIndex}`}
                  style={{ backgroundColor: c }}
                  className="h-[14px] w-[14px] border-[1px] border-[#00000008] box-border cursor-pointer"
                  onClick={() => handleColorUpdate(c)}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <span className="text-xs text-[#bfbfbf]">标准颜色</span>
      <div className="flex flex-col">
        {PickerColorBox.baseColor.map((colorLine, index) => (
          <div className="flex">
            {colorLine.map((c, subIndex) => (
              <div className="w-[20px] h-[20px] flex justify-center items-center hover:bg-[#f2f2f2]">
                <div
                  key={`bc-${index}-${subIndex}`}
                  style={{ backgroundColor: c }}
                  className="h-[14px] w-[14px] border-[1px] border-[#00000008] box-border cursor-pointer"
                  onClick={() => handleColorUpdate(c)}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* <HexColorPicker className="w-full" color={color || ''} onChange={onChange} />
      <input
        type="text"
        className="w-full p-2 text-black bg-white border rounded dark:bg-black dark:text-white border-neutral-200 dark:border-neutral-800 focus:outline-1 focus:ring-0 focus:outline-neutral-300 dark:focus:outline-neutral-700"
        placeholder="#000000"
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
      />
      <div className="flex flex-wrap items-center gap-1 max-w-[15rem]">
        {themeColors.map((currentColor) => (
          <ColorButton
            active={currentColor === color}
            color={currentColor}
            key={currentColor}
            onColorChange={onChange}
          />
        ))}
        <Toolbar.Button tooltip="Reset color to default" onClick={onClear}>
          <Icon name="Undo" />
        </Toolbar.Button>
      </div> */}
    </div>
  );
};

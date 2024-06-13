import { FunctionComponent, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import { List } from '../elements/list/list';
import { PopOver } from '../elements/popover';
import { ArrowDownIcon, LayoutIcon, ParaIcon } from '../icons';
import {
  ChangeDensityProp,
  LayoutSwitcherProp,
  QuickJumpProp,
} from './timeline-popover.model';

const LayoutSwitcher: FunctionComponent<LayoutSwitcherProp> = ({
  onUpdateTimelineMode,
  theme,
  isDarkMode,
  position,
  isMobile,
}: LayoutSwitcherProp) => {
  const { showAllCardsHorizontal, buttonTexts, mode } = useContext(GlobalContext);

  const layoutOptions = useMemo(
    () => ({
      alternating: buttonTexts?.changeLayoutOptions.alternating,
      horizontal: buttonTexts?.changeLayoutOptions.horizontal,
      horizontal_all: buttonTexts?.changeLayoutOptions.horizontal_all,
      vertical: buttonTexts?.changeLayoutOptions.vertical,
    }),
    [],
  );

  const verticalItems = useMemo(
    () => [
      {
        description: layoutOptions.vertical.helpText,
        id: 'VERTICAL',
        onSelect: () => onUpdateTimelineMode('VERTICAL'),
        selected: mode === 'VERTICAL',
        title: layoutOptions.vertical.text,
      },
      {
        description: layoutOptions.alternating.helpText,
        id: 'VERTICAL_ALTERNATING',
        onSelect: () => onUpdateTimelineMode('VERTICAL_ALTERNATING'),
        selected: mode === 'VERTICAL_ALTERNATING',
        title: layoutOptions.alternating.text,
      },
    ],
    [mode],
  );

  // horizontal list OF options when the mode is `HORIZONTAL`
  const horizontalItems = useMemo(
    () => [
      {
        description: layoutOptions.horizontal.helpText,
        id: 'HORIZONTAL',
        onSelect: () => {
          onUpdateTimelineMode('HORIZONTAL');
        },
        selected: mode === 'HORIZONTAL',
        title: layoutOptions.horizontal.text,
      },
      {
        description: layoutOptions.horizontal_all.helpText,
        id: 'HORIZONTAL_ALL',
        onSelect: () => {
          onUpdateTimelineMode('HORIZONTAL_ALL');
        },
        selected: mode === 'HORIZONTAL_ALL',
        title: layoutOptions.horizontal_all.text,
      },
    ],
    [mode],
  );

  return (
    <PopOver
      placeholder={buttonTexts.changeLayout}
      position={position}
      theme={theme}
      isDarkMode={isDarkMode}
      icon={<LayoutIcon />}
      $isMobile={isMobile}
    >
      <List
        /*items={
          mode === 'HORIZONTAL' || mode === 'HORIZONTAL_ALL'
            ? horizontalItems
            : verticalItems
        }
        show all modes in the list*/
        items={[
          ...horizontalItems,
          ...verticalItems,
        ]}
        theme={theme}
        multiSelectable
      />
    </PopOver>
  );
};

const QuickJump: FunctionComponent<QuickJumpProp> = ({
  activeItem,
  items,
  theme,
  onActivateItem,
  isDarkMode,
  position,
  isMobile,
}: QuickJumpProp) => {
  const { buttonTexts } = useContext(GlobalContext);

  return (
    <PopOver
      placeholder={buttonTexts.jumpTo}
      position={position}
      theme={theme}
      width={400}
      isDarkMode={isDarkMode}
      $isMobile={isMobile}
      icon={<ArrowDownIcon />}
    >
      <List
        items={items.map((item, index) => ({
          active: index === activeItem,
          description: item.description,
          id: item.id,
          label: item.title,
          onSelect: () => {},
          title: item.title || `Item ${index + 1}`,
        }))}
        theme={theme}
        onClick={onActivateItem}
      />
    </PopOver>
  );
};

const ChangeDensity: FunctionComponent<ChangeDensityProp> = ({
  onChange,
  selectedDensity,
  theme,
  isDarkMode,
  position,
  isMobile,
}) => {
  const { buttonTexts } = useContext(GlobalContext);

  const items = useMemo(
    () => [
      {
        description: 'Zeigt weniger Text auf einmal',
        id: 'LOW',
        onSelect: () => onChange('LOW'),
        selected: selectedDensity === 'LOW',
        title: 'Niedrig',
      },
      {
        description: 'Zeigt mehr Text auf einmal',
        id: 'HIGH',
        onSelect: () => onChange('HIGH'),
        selected: selectedDensity === 'HIGH',
        title: 'Hoch',
      },
    ],
    [selectedDensity],
  );

  return (
    <PopOver
      placeholder={buttonTexts.changeDensity}
      theme={theme}
      isDarkMode={isDarkMode}
      position={position}
      $isMobile={isMobile}
      width={300}
      icon={<ParaIcon />}
    >
      <List items={items} theme={theme} multiSelectable />
    </PopOver>
  );
};

export { ChangeDensity, LayoutSwitcher, QuickJump };

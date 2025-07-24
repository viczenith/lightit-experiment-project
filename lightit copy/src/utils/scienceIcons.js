export const subjectColors = {
  Physics: 'bg-science-blue',
  Chemistry: 'bg-reaction-orange',
  Biology: 'bg-element-green'
};

export const getSubjectIcon = (subject) => {
  const icons = {
    Physics: '⚛️',
    Chemistry: '🧪',
    Biology: '🧬'
  };
  return icons[subject] || '🔬';
};

export const getGradeIcon = (grade) => {
  return `📚 ${grade}`;
};

export const getEquipmentIcon = (equipment) => {
  const icons = {
    beaker: '🧪',
    burner: '🔥',
    microscope: '🔬',
    telescope: '🔭',
    scale: '⚖️'
  };
  return icons[equipment] || '🧰';
};
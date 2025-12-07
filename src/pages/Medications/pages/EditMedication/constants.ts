const medicationData: { [key: string]: {
    medication: string;
    dependent: string;
    doctor: string;
    dosage: string;
    dateUntil: string;
    continuousUse: boolean;
    times: string[];
    comments: string;
  } } = {
    'clonazepam': {
      medication: 'Clonazepam',
      dependent: 'graca-lima',
      doctor: "Dr. Marco Di'Angelo",
      dosage: '5mg',
      dateUntil: '12/01/2025',
      continuousUse: true,
      times: ['08:00'],
      comments: '',
    },
}

export { medicationData };

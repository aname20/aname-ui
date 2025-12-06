import { Box, Chip } from "@mui/material"

const TimeLabelIcon = ({ time, day }: { time: string; day: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <span>{`${time} ${day}`}</span>

      <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#456CE8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: 4 }}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </Box>
    </Box>
);

export const MedicationTimeItem: React.FC<{ time: string; day: string }> = ({ time, day }) => {
    return (
        <Chip
            label={
                <TimeLabelIcon time={time} day={day} />
            }
            sx={{
                width: '115px',
                bgcolor: 'white',
                color: 'primary.main',
                borderRadius: 2,
                border: '0.5px solid #456CE8',
                fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                height: { xs: 32, sm: 36 },
                '& .MuiChip-label': {
                px: 1.5,
                },
            }}
            />
    )
}
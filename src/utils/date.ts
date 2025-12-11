const formatDate = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '').slice(0, 8)

    if (numbers.length === 0) {
        return ''
    }

    // Formata incrementalmente enquanto o usuário digita
    if (numbers.length <= 2) {
        // Apenas dia: DD
        return numbers
    } else if (numbers.length <= 4) {
        // Dia e mês: DD/MM
        return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    } else {
        // Dia, mês e ano: DD/MM/YYYY
        return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
    }
}

export {
    formatDate
}

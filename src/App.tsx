
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import MainLayout from './layouts/MainLayout';
import './i18n/config';

import HabitsPage from './features/habits/HabitsPage';
import FinancesPage from './features/finance/FinancesPage';
import ToDoPage from './features/tasks/ToDoPage';
import StatsPage from './features/stats/StatsPage';

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="lifeos-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HabitsPage />} />
                        <Route path="/finances" element={<FinancesPage />} />
                        <Route path="/todo" element={<ToDoPage />} />
                        <Route path="/stats" element={<StatsPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

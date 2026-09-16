import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Users, UserRoundPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';
import { index as studentsIndex } from '@/routes/students';

type Metric = {
    label: string;
    total: number;
};

type RecentStudent = {
    id: number;
    first_name: string;
    last_name: string;
    program: string;
    status: string;
    created_at: string;
};

type Props = {
    totalStudents: number;
    programDistribution: Metric[];
    statusBreakdown: Metric[];
    recentStudents: RecentStudent[];
};

export default function Dashboard({
    totalStudents,
    programDistribution,
    statusBreakdown,
    recentStudents,
}: Props) {
    const largestProgramTotal = Math.max(
        ...programDistribution.map((item) => item.total),
        1,
    );
    const largestStatusTotal = Math.max(
        ...statusBreakdown.map((item) => item.total),
        1,
    );

    return (
        <>
            <Head title="Dashboard" />
            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Student overview
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Dashboard
                        </h1>
                    </div>
                    <nav className="flex items-center gap-1 rounded-lg border bg-card p-1 text-sm">
                        <Link
                            href={dashboard()}
                            className="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground"
                        >
                            Overview
                        </Link>
                        <Link
                            href={studentsIndex()}
                            className="rounded-md px-3 py-2 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            Students CRUD
                        </Link>
                    </nav>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total students
                            </CardTitle>
                            <Users className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">{totalStudents}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Students registered in the roster
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Programs
                            </CardTitle>
                            <GraduationCap className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">
                                {programDistribution.length}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Programs represented
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Recently registered
                            </CardTitle>
                            <UserRoundPlus className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">
                                {recentStudents.length}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Latest records shown below
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Program distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {programDistribution.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No student programs yet.
                                </p>
                            ) : (
                                programDistribution.map((item) => (
                                    <div key={item.label} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{item.label}</span>
                                            <span className="text-muted-foreground">{item.total}</span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full rounded-full bg-primary transition-all"
                                                style={{
                                                    width: `${(item.total / largestProgramTotal) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Student status breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {statusBreakdown.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No student statuses yet.
                                </p>
                            ) : (
                                statusBreakdown.map((item) => (
                                    <div key={item.label} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{item.label}</span>
                                            <span className="text-muted-foreground">{item.total}</span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full rounded-full bg-emerald-500 transition-all"
                                                style={{
                                                    width: `${(item.total / largestStatusTotal) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recently registered students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentStudents.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No students registered yet.
                            </p>
                        ) : (
                            <div className="divide-y">
                                {recentStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {student.first_name} {student.last_name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {student.program} · {student.status}
                                            </p>
                                        </div>
                                        <time className="text-sm text-muted-foreground">
                                            {new Date(student.created_at).toLocaleDateString()}
                                        </time>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

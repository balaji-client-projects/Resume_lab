import React from "react";

export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-background p-10 space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground">Design System</h1>
                <p className="text-muted-foreground text-lg">
                    A showcase of the Job Management Tool design tokens and components.
                </p>
            </div>

            {/* --- Typography --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Typography</h2>
                <div className="space-y-2">
                    <h1>H1: The quick brown fox jumps over the lazy dog</h1>
                    <h2>H2: The quick brown fox jumps over the lazy dog</h2>
                    <h3>H3: The quick brown fox jumps over the lazy dog</h3>
                    <p className="text-base">Body: The quick brown fox jumps over the lazy dog (Base)</p>
                    <p className="text-sm text-muted-foreground">Small Muted: The quick brown fox jumps over the lazy dog</p>
                </div>
            </section>

            {/* --- Colors --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Theme Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-primary shadow-sm"></div>
                        <p className="text-sm font-medium">Primary</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-secondary shadow-sm"></div>
                        <p className="text-sm font-medium">Secondary</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-accent shadow-sm"></div>
                        <p className="text-sm font-medium">Accent</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-muted shadow-sm"></div>
                        <p className="text-sm font-medium">Muted</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-card border shadow-sm"></div>
                        <p className="text-sm font-medium">Card Surface</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-popover border shadow-sm"></div>
                        <p className="text-sm font-medium">Popover</p>
                    </div>
                </div>
            </section>

            {/* --- Buttons --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <button className="btn btn-primary">Primary Action</button>
                    <button className="btn btn-secondary">Secondary</button>
                    <button className="btn btn-outline">Outline</button>
                    <button className="btn btn-ghost">Ghost</button>
                    <button className="btn btn-danger">Danger / Blocked</button>
                </div>
            </section>

            {/* --- Badges & Pills --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Status Indicators</h2>
                <div className="flex flex-wrap gap-4">
                    <span className="status-pill success">Success</span>
                    <span className="status-pill pending">Pending</span>
                    <span className="status-pill progress">In Progress</span>
                    <span className="status-pill blocked">Blocked</span>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                    <span className="badge badge-primary">Primary Badge</span>
                    <span className="badge badge-outline">Outline Badge</span>
                </div>
            </section>

            {/* --- Job Cards --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Job Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="job-card status-progress">
                        <div className="card-header">
                            <div className="flex justify-between items-start">
                                <span className="status-pill progress">In Progress</span>
                                <span className="text-xs text-muted-foreground">#JOB-1024</span>
                            </div>
                            <h3 className="card-title mt-2">Senior React Developer</h3>
                        </div>
                        <div className="card-content">
                            <p className="text-sm text-muted-foreground mb-4">
                                Client: TechCorp Inc. <br />
                                Due: Dec 24, 2025
                            </p>
                            <div className="flex gap-2">
                                <span className="badge badge-outline">Remote</span>
                                <span className="badge badge-outline">React</span>
                            </div>
                        </div>
                    </div>

                    <div className="job-card status-pending">
                        <div className="card-header">
                            <div className="flex justify-between items-start">
                                <span className="status-pill pending">Pending Review</span>
                                <span className="text-xs text-muted-foreground">#JOB-1025</span>
                            </div>
                            <h3 className="card-title mt-2">UX Designer</h3>
                        </div>
                        <div className="card-content">
                            <p className="text-sm text-muted-foreground mb-4">
                                Client: DesignStudio <br />
                                Due: Dec 30, 2025
                            </p>
                            <div className="flex gap-2">
                                <span className="badge badge-outline">Figma</span>
                                <span className="badge badge-outline">Mobile</span>
                            </div>
                        </div>
                    </div>

                    <div className="job-card status-success">
                        <div className="card-header">
                            <div className="flex justify-between items-start">
                                <span className="status-pill success">Placed</span>
                                <span className="text-xs text-muted-foreground">#JOB-1020</span>
                            </div>
                            <h3 className="card-title mt-2">Product Manager</h3>
                        </div>
                        <div className="card-content">
                            <p className="text-sm text-muted-foreground mb-4">
                                Client: EnterpriseCo <br />
                                Closed: Dec 10, 2025
                            </p>
                            <div className="flex gap-2">
                                <span className="badge badge-outline">Agile</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Forms --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Form Elements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                    <div className="space-y-2">
                        <label className="form-label">Job Title</label>
                        <input type="text" className="form-input" placeholder="e.g. Software Engineer" />
                    </div>
                    <div className="space-y-2">
                        <label className="form-label">Category</label>
                        <select className="form-input">
                            <option>Engineering</option>
                            <option>Design</option>
                            <option>Product</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* --- Tables --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Data Table</h2>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Candidates</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#1024</td>
                                <td className="font-medium">Backend Engineer</td>
                                <td><span className="status-pill progress">Active</span></td>
                                <td>12</td>
                                <td>$15,000</td>
                            </tr>
                            <tr>
                                <td>#1025</td>
                                <td className="font-medium">Frontend Developer</td>
                                <td><span className="status-pill pending">Pending</span></td>
                                <td>4</td>
                                <td>$12,000</td>
                            </tr>
                            <tr>
                                <td>#1026</td>
                                <td className="font-medium">DevOps Specialist</td>
                                <td><span className="status-pill blocked">On Hold</span></td>
                                <td>0</td>
                                <td>$18,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
